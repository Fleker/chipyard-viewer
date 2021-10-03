import test from 'ava'
import * as fs from 'fs'
import { parseFile } from '../app/file-parser'

test('can load all files', async t => {
  const examples = await fs.readdirSync('./examples')
  for (const file of examples) {
    const fileContent = await fs.readFileSync(`./examples/${file}`, 'utf-8')
    parseFile(fileContent)
  }
  t.pass()
})

test('parse .out metadata', async t => {
  const sampleFile = await fs.readFileSync('./examples/rv64um-p-remw.out', 'utf-8')
  const chipyardFile = parseFile(sampleFile)
  t.is(chipyardFile.randomSeed, 1632264116)
  t.is(chipyardFile.port, 44873)
  t.is(chipyardFile.deviceModelFile, '/home/fleker/Desktop/chipyard/generators/testchipip/src/main/resources/dramsim2_ini/DDR3_micron_64M_8B_x4_sg15.ini')
  t.is(chipyardFile.systemModelFile, '/home/fleker/Desktop/chipyard/generators/testchipip/src/main/resources/dramsim2_ini/system.ini')
  t.is(chipyardFile.memorySystem, 0)
  t.is(chipyardFile.channel, 0)
  t.is(chipyardFile.totalStorageMb, 4096)
  t.is(chipyardFile.ranks, 1)
  t.is(chipyardFile.devicesPerRank, 16)
  t.is(chipyardFile.dramClockFreqHz, 666666666)
  t.is(chipyardFile.cpuClockFreqHz, 100000000)

  t.is(chipyardFile.hasPassed, true)
  t.is(chipyardFile.cycles, 12767)
})

test('parse rv64mi-p-access.out', async t => {
  const sampleFile = await fs.readFileSync('./examples/rv64mi-p-access.out', 'utf-8')
  const chipyardFile = parseFile(sampleFile)
  const {operations} = chipyardFile
  const opUnderTest = operations[0]
  t.is(opUnderTest.clock, 19)
  t.is(opUnderTest.programCounter, '0000000000010040')
  t.true(opUnderTest.isWrite)
  t.is(opUnderTest.instructionOp, '00000517')
  t.is(opUnderTest.instructionName, 'auipc')
  t.is(opUnderTest.insArgOut, 'a0')
  t.is(opUnderTest.insArgIn1, '0x0')
})

test('parse rv64um-p-remw.out', async t => {
  const sampleFile = await fs.readFileSync('./examples/rv64um-p-remw.out', 'utf-8')
  const chipyardFile = parseFile(sampleFile)
  const {operations} = chipyardFile
  const opUnderTest = operations[4]
  t.is(opUnderTest.clock, 29)
  t.is(opUnderTest.writeValue, 'ffffe00000000025')
})
