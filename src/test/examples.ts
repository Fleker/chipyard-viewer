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
