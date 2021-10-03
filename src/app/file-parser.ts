export interface ChipyardFile {
  operations: ChipyardOutput[]
}

export interface ChipyardOutput {
  line: string
  clock: number
  programCounter: string
  writeRegister: string
  writeValue: string
  isWrite: boolean
  readRegister1: string
  readValue1: string
  readRegister2: string
  readValue2: string
  instructionOp: string
  instructionName: string
  insArgOut: string
  insArgIn1: string
  insArgIn2: string
  insArgIn3: string

  pgmLength: number
}

export function parseNominalLine(line: string): ChipyardOutput | null {
  // Wow this is a long regular expression
  // C0:         19 [1] pc=[0000000000010040] W[r10=0000000000010040][1] R[r 0=0000000000000000] R[r 0=0000000000000000] inst=[00000517] auipc   a0, 0x0
  const regex = new RegExp(`C0:\\s*(\\d+)\\s\\[\\d\\]\\spc=\\[([\\d\\w]+)\\]\\sW\\[(r\\s?\\d+)=([\\d\\w]+)\\]\\[(\\d)\\]\\sR\\[(r\\s?\\d+)=([\\d\\w]+)]\\sR\\[(r\\s?\\d+)=([\\d\\w]+)]\\sinst=\\[([\\w]+)\\]\\s(\\w+)\\s*([\\w-]+)?,?\\s?([\\w-]+)?,?\\s?([\\w-]+)?,?\\s?([\\w-]+)?`)
  const match = line.match(regex)
  if (!match) {
    console.warn('no match', line)
    return null
  }
  const [
    _, // 0
    clock,
    programCounter,
    writeRegister, // 3
    writeValue,
    isWrite,
    readRegister1, // 6
    readValue1,
    readRegsiter2,
    readValue2, // 9
    instructionOp,
    instructionName,
    insArgOut, // 12
    insArgIn1,
    insArgIn2,
    insArgIn3, // 15
  ] = match
  return {
    line,
    clock: parseInt(clock),
    programCounter: programCounter,
    writeRegister: writeRegister,
    writeValue: writeValue,
    isWrite: isWrite === '1',
    readRegister1: readRegister1,
    readValue1: readValue1,
    readRegister2: readRegsiter2,
    readValue2: readValue2,
    instructionOp: instructionOp,
    instructionName, insArgOut, insArgIn1,
    insArgIn2, insArgIn3,
    pgmLength: 1,
  }
}

export function parseFile(rawFile: string): ChipyardFile {
  const out: ChipyardOutput[] = []
  let pgmLength = 0
  const lines = rawFile.split('\n')
  lines.forEach((line, index) => {
    if (index < 8) return
    if (index >= lines.length - 2) return
    const v = parseNominalLine(line)
    if (v !== null) {
      v.pgmLength = pgmLength
      pgmLength = v.clock
      out.push(v)
    }
  })
  return {
    operations: out
  }
}
