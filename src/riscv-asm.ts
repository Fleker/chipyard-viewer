/**
 * @fileoverview An object containing RISCV assembly instructions and how they
 * work. This is used in the `hover-card` module.
 *
 * Future work will be investigating how to support custom instructions in this
 * application, as well as how to support other instruction set architectures
 * (ISAs). Additionally, completing the entierty of RISC-V instructions will be
 * useful.
 *
 * PDF page 122 of the RISC-V spec shows a number of pseudo-instructions based
 * on real instructions with specific parameters. How should they be
 * represented?
 * @see https://riscv.org/wp-content/uploads/2017/05/riscv-spec-v2.2.pdf
 */

/**
 * Represents a single assembly operation.
 */
export interface AsmIns {
  /**
   * Label for the name of the operation, ie. "addi" => "Add Immediate".
   */
  title: string
  /**
   * A brief description of what this instruction does.
   */
  description: string
}

/**
 * A mapping of every RISC-V instruction.
 * @see https://mark.theis.site/riscv/
 * @see https://www2.eecs.berkeley.edu/Pubs/TechRpts/2014/EECS-2014-54.pdf
 */
export const RiscvAsm: Record<string, AsmIns> = {
  add: {
    title: 'Add',
    description: '',
  },
  addi: {
    title: 'Add Immediate',
    description: '',
  },
  addiw: {
    title: 'Add Immediate Word',
    description: '',
  },
  addw: {
    title: 'Add Word',
    description: '',
  },
  and: {
    title: 'AND',
    description: '',
  },
  andi: {
    title: 'AND Immediate',
    description: '',
  },
  auipc: {
    title: 'Add Upper Immediate to Program Counter',
    description: '',
  },
  beq: {
    title: 'Branch if Equal',
    description: '',
  },
  beqz: {
    title: 'Branch if Equal To Zero',
    description: '',
  },
  bge: {
    title: 'Branch if Greater Than or Equal To',
    description: '',
  },
  bgez: {
    title: 'Branch if Greater Than or Equal To Zero',
    description: '',
  },
  bgeu: {
    title: 'Branch if Greater Than or Equal To (Unsigned)',
    description: '',
  },
  bgt: {
    title: 'Branch if Greater Than',
    description: '',
  },
  blt: {
    title: 'Branch if Less Than',
    description: '',
  },
  bltu: {
    title: 'Branch if Less Than (Unsigned)',
    description: '',
  },
  bltz: {
    title: 'Branch if Less Than Zero',
    description: '',
  },
  bne: {
    title: 'Branch if Not Equal',
    description: '',
  },
  bnez: {
    title: 'Branch if Not Equal To Zero',
    description: '',
  },
  call: {
    title: 'Call far-away subroutine',
    description: '',
  },
  csrc: {
    title: 'Control/Status Clear',
    description: 'Clears value for the control and status registers.'
  },
  csrr: {
    title: 'Control/Status Read',
    description: 'Atomic read to the control and status registers.'
  },
  csrs: {
    title: 'Control/Status Sets',
    description: 'Sets specific bits in the control and status registers.'
  },
  csrw: {
    title: 'Control/Status Write',
    description: 'Atomic write to the control and status registers.'
  },
  div: {
    title: 'Divide',
    description: '',
  },
  divu: {
    title: 'Divide (Unsigned)',
    description: '',
  },
  divuw: {
    title: 'Divide Word (Unsigned)',
    description: '',
  },
  divw: {
    title: 'Divide Word',
    description: '',
  },
  fence: {
    title: 'Fence',
    description: 'Fence on all memory and I/O',
  },
  'fence.i': {
    title: 'Fence Immediate',
    description: '',
  },
  j: {
    title: 'Jump',
    description: '',
  },
  jal: {
    title: 'Jump and Link',
    description: '',
  },
  jalr: {
    title: 'Jump and Link Register',
    description: '',
  },
  jr: {
    title: 'Jump Register',
    description: '',
  },
  lb: {
    title: 'Load Byte',
    description: '',
  },
  lbu: {
    title: 'Load Byte (Unsigned)',
    description: '',
  },
  ld: {
    title: 'Load Double',
    description: '',
  },
  li: {
    title: 'Load Immediate',
    description: '',
  },
  lh: {
    title: 'Load Half',
    description: '',
  },
  lhu: {
    title: 'Load Half (Unsigned)',
    description: '',
  },
  lui: {
    title: 'Load Upper Immediate',
    description: ''
  },
  lwu: {
    title: 'Load Word Unsigned',
    description: '',
  },
  mul: {
    title: 'Multiply',
    description: '',
  },
  mulh: {
    title: 'Multiply High Signed Signed',
    description: '',
  },
  mulhsu: {
    title: 'Multiply High Signed Unsigned',
    description: '',
  },
  mulhu: {
    title: 'Multiply High Unisigned Unsigned',
    description: '',
  },
  mulw: {
    title: 'Multiply Word',
    description: '',
  },
  mv: {
    title: 'Copy Register',
    description: '',
  },
  neg: {
    title: "Two's Complement",
    description: '',
  },
  negw: {
    title: "Two's Complement Word",
    description: '',
  },
  nop: {
    title: 'No Operation',
    description: 'Stall for one clock cycle.',
  },
  not: {
    title: "One's Complement",
    description: '',
  },
  or: {
    title: 'OR',
    description: '',
  },
  ori: {
    title: 'OR Immediate',
    description: '',
  },
  rem: {
    title: 'Remainder',
    description: '',
  },
  remu: {
    title: 'Remainder (Unsigned)',
    description: '',
  },
  remuw: {
    title: 'Remainder Word (Unsigned)',
    description: '',
  },
  remw: {
    title: 'Remainder Word',
    description: '',
  },
  ret: {
    title: 'Return from Subroutine',
    description: '',
  },
  sb: {
    title: 'Store Byte',
    description: '',
  },
  sd: {
    title: 'Store Double',
    description: '',
  },
  sh: {
    title: 'Store Half',
    description: '',
  },
  sll: {
    title: 'Shift Left Logical',
    description: '',
  },
  slli: {
    title: 'Shift Left Logical Immediate',
    description: '',
  },
  slliw: {
    title: 'Shift Left Logical Immediate Word',
    description: '',
  },
  slt: {
    title: 'Set Less Than',
    description: '',
  },
  slti: {
    title: 'Set Less Than Immediate',
    description: '',
  },
  sltiu: {
    title: 'Set Less Than Immediate (Unsigned)',
    description: '',
  },
  sltu: {
    title: 'Set Less Than (Unsigned)',
    description: '',
  },
  sllw: {
    title: 'Shift Left Logical Word',
    description: '',
  },
  sra: {
    title: 'Shift Right Arithmetic',
    description: '',
  },
  srai: {
    title: 'Shift Right Arithmetic Immediate',
    description: '',
  },
  sraiw: {
    title: 'Shift Right Arithmetic Immediate Word',
    description: '',
  },
  sraw: {
    title: 'Shift Right Arithmetic Word',
    description: '',
  },
  srl: {
    title: 'Shift Right Logical',
    description: '',
  },
  srli: {
    title: 'Shift Right Logical Immediate',
    description: '',
  },
  srliw: {
    title: 'Shift Right Logical Immediate Word',
    description: '',
  },
  srlw: {
    title: 'Shift Right Logical Word',
    description: '',
  },
  sub: {
    title: 'Subtract',
    description: '',
  },
  subw: {
    title: 'Subtract Word',
    description: '',
  },
  sw: {
    title: 'Store Word',
    description: '',
  },
  tail: {
    title: 'Tail call far-away subroutine',
    description: '',
  },
  xor: {
    title: 'XOR',
    description: '',
  },
  xori: {
    title: 'XOR Immediate',
    description: '',
  },
}
