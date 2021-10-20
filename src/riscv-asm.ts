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
  auipc: {
    title: 'Add Upper Immediate to Program Counter',
    description: '',
  },
  beq: {
    title: 'Branch if Equal',
    description: '',
  },
  bge: {
    title: 'Branch if Greater Than or Equal To',
    description: '',
  },
  bgeu: {
    title: 'Branch if Greater Than or Equal To (Unsigned)',
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
  bne: {
    title: 'Branch if Not Equal',
    description: '',
  },
  jal: {
    title: 'Jump and Link',
    description: '',
  },
  lui: {
    title: 'Load Upper Immediate',
    description: ''
  },
}
