export interface ChipyardFile {
  randomSeed: number
  port: number
  deviceModelFile: string
  systemModelFile: string
  memorySystem: number
  channel: number
  totalStorageMb: number
  ranks: number
  devicesPerRank: number
  dramClockFreqHz: number
  cpuClockFreqHz: number
  hasPassed: boolean
  cycles: number
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

export function parseSeedLine(line: string) {
  // using random seed 1632264116
  const regex = new RegExp('using random seed (\\d+)')
  const match = line.match(regex)
  if (match) {
    const [_, randomSeed] = match
    return {
      randomSeed: parseInt(randomSeed),
    }
  }
  return {
    randomSeed: -1
  }
}

export function parsePortLine(line: string) {
  // Listening on port 44873
  const regex = new RegExp('Listening on port (\\d+)')
  const match = line.match(regex)
  if (match) {
    const [_, port] = match
    return {
      port: parseInt(port),
    }
  }
  return {
    port: -1
  }
}

export function parseDeviceModelLine(line: string) {
  // == Loading device model file '/home/fleker/Desktop/chipyard/generators/testchipip/src/main/resources/dramsim2_ini/DDR3_micron_64M_8B_x4_sg15.ini' == 
  const regex = new RegExp(`== Loading device model file '([\\w/.]+)' ==`)
  const match = line.match(regex)
  if (match) {
    const [_, deviceModelFile] = match
    return {
      deviceModelFile,
    }
  }
  return {
    deviceModelFile: '',
  }
}

export function parseSystemModelLine(line: string) {
  // == Loading system model file '/home/fleker/Desktop/chipyard/generators/testchipip/src/main/resources/dramsim2_ini/system.ini' == 
  const regex = new RegExp(`== Loading system model file '([\\w/.]+)' ==`)
  const match = line.match(regex)
  if (match) {
    const [_, systemModelFile] = match
    return {
      systemModelFile,
    }
  }
  return {
    systemModelFile: '',
  }
}

export function parseMemorySystemLine(line: string) {
  // ===== MemorySystem 0 =====
  const regex = new RegExp(`===== MemorySystem (\\d+) =====`)
  const match = line.match(regex)
  if (match) {
    const [_, memorySystem] = match
    return {
      memorySystem: parseInt(memorySystem),
    }
  }
  return {
    memorySystem: -1,
  }
}

export function parseDevicesLine(line: string) {
  // CH. 0 TOTAL_STORAGE : 4096MB | 1 Ranks | 16 Devices per rank
  const regex = new RegExp(`CH. (\\d+) TOTAL_STORAGE : (\\d+)MB \\| (\\d+) Ranks \\| (\\d+) Devices per rank`)
  const match = line.match(regex)
  // console.log(line, regex, match)
  if (match) {
    const [_, channel, totalStorageMb, ranks, devicesPerRank] = match
    return {
      channel: parseInt(channel),
      totalStorageMb: parseInt(totalStorageMb),
      ranks: parseInt(ranks),
      devicesPerRank: parseInt(devicesPerRank),
    }
  }
  return {
    channel: -1,
    totalStorageMb: -1,
    ranks: -1,
    devicesPerRank: -1,
  }
}

export function parseClocksLine(line: string) {
    // DRAMSim2 Clock Frequency =666666666Hz, CPU Clock Frequency=100000000Hz
    const regex = new RegExp(`DRAMSim2 Clock Frequency =(\\d+)Hz, CPU Clock Frequency=(\\d+)Hz`)
    const match = line.match(regex)
    if (match) {
      const [_, dramClockFreqHz, cpuClockFreqHz] = match
      return {
        dramClockFreqHz: parseInt(dramClockFreqHz),
        cpuClockFreqHz: parseInt(cpuClockFreqHz),
      }
    }
    return {
      dramClockFreqHz: -1,
      cpuClockFreqHz: -1,
    }
}

export function parseCompletionLine(line: string) {
  // *** PASSED *** Completed after 12767 cycles
  const regex = new RegExp(`\\*\\*\\* (\\w+) \\*\\*\\* Completed after (\\d+) cycles`)
  const match = line.match(regex)
  if (match) {
    const [_, hasPassed, cycles] = match
    return {
      hasPassed: hasPassed === 'PASSED',
      cycles: parseInt(cycles),
    }
  }
  return {
    hasPassed: false,
    cycles: -1,
  }
}

export function parseFile(rawFile: string): ChipyardFile {
  const file: ChipyardFile = {
    randomSeed: -1,
    port: -1,
    deviceModelFile: '',
    systemModelFile: '',
    memorySystem: -1,
    channel: -1,
    cpuClockFreqHz: -1,
    devicesPerRank: -1,
    dramClockFreqHz: -1,
    ranks: -1,
    totalStorageMb: -1,
    hasPassed: false,
    cycles: -1,
    operations: [],
  }
  const out: ChipyardOutput[] = []
  let pgmLength = 0
  const lines = rawFile.split('\n')
  lines.forEach((line, index) => {
    if (index === 0) {
      const {randomSeed} = parseSeedLine(line)
      file.randomSeed = randomSeed
      return
    }
    if (index === 2) {
      const {port} = parsePortLine(line)
      file.port = port
      return
    }
    if (index === 3) {
      const {deviceModelFile} = parseDeviceModelLine(line)
      file.deviceModelFile = deviceModelFile
      return
    }
    if (index === 4) {
      const {systemModelFile} = parseSystemModelLine(line)
      file.systemModelFile = systemModelFile
      return
    }
    if (index === 5) {
      const {memorySystem} = parseMemorySystemLine(line)
      file.memorySystem = memorySystem
      return
    }
    if (index === 6) {
      const {channel, totalStorageMb, ranks, devicesPerRank} = parseDevicesLine(line)
      file.channel = channel
      file.totalStorageMb = totalStorageMb,
      file.ranks = ranks
      file.devicesPerRank = devicesPerRank
      return
    }
    if (index === 7) {
      const {dramClockFreqHz, cpuClockFreqHz} = parseClocksLine(line)
      file.dramClockFreqHz = dramClockFreqHz
      file.cpuClockFreqHz = cpuClockFreqHz
      return
    }
    if (index < 8) return
    if (index === lines.length - 2) {
      const {hasPassed, cycles} = parseCompletionLine(line)
      file.hasPassed = hasPassed
      file.cycles = cycles
      return
    }
    if (index > lines.length - 2) return
    const v = parseNominalLine(line)
    if (v !== null) {
      v.pgmLength = pgmLength
      pgmLength = v.clock
      out.push(v)
    }
  })
  file.operations = out
  return file
}
