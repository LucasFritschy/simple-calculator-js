class Calculator {
  // definindo o construtor da classe calculator, os objetos são acessados por queryselector
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  // o método clear limpa os valores em current operand e previous operand e reseta o operador selecionado na calculadora
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operand = undefined
  }
  // método que retorn o valor em currentOperand sem o último elemento
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  // método que recebe um valor e o atribui ao atributo currentOperand
  appendNumber(number) {
    // limitador que impede que dois dígitos sejam adicionados no mesmo número
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  // método que recebe o valor do botão clicado e altera o valor do currentOperand para o previous operand
  chooseOperation(operation) {
    // if que impede a seleção de qualquer operação senão houver um valor no currentOperand
    if (this.currentOperand === '') return
    // if que executa o método compute antes de trocar o valor da posição currentOperando para previousOperand
    if (this.currentOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  // método que executa as operações matemáticas 
  compute() {
    // criar um variável let para que não saia do escopo do método
    let computation
    // designar os valores em tela para variáveis constantes e não executar nada caso algum dos valores não seja um número
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    // estrutura switch que identifica o operador escolhido, executa a operação e designa à variável computation 
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '÷':
        computation = prev / current
        break
      case '*':
        computation = prev * current
        break
      default:
        return
    }
    // exibir o resultado em tela, apagar o valor em previousOperand e zera o operation selecionado
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  // funcão auxiliar que mostra corretamente o números com casas decimais e permite adicionar zeros após uma casa decimal
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    // separar o valor recebibo em 2 arrays, um com os números antes da casa decimal e um após a casa decimal
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    // caso integerDigits não seja o um número, significa que o usuário inseriu um dígito antes de qualquer valor
    if (isNaN(integerDigits)) {
      integerDisplay = ''
      //caso o usuário não insira nenhum dígito, a função toLocaleString exibirá as vírgulas automaticamente
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0})
    }
    // o trecha abaixo verifica se há dígito decimal no valor e exibe corretamente de acordo
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  // método que recebe o valor de currentOperand e o atribui ao currentOperandTextElement, vinculando o valor a div e exibindo em tela
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }

}

const numberButtons = document.querySelectorAll('[data-number]')
const operationsButtons = document.querySelectorAll('[data-operand]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// instanciando um objeto do tipo calculator
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// todos os botões numéricos recebem um listener, que ao ser clicado, executa o método appendNumber
// em seguida executa o método updateDisplay para atualizar o número em tela
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

// todos os botões de operação também recebem um listener que enviam o valor do botão para o método choose operation
operationsButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

// botão de igual, que ao ser clicado executa o método compute e updateDisplay
equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

// botão all clear, executa o método clear e atualiza o display
allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

// botão delete, executa o método dele e atualiza o display
deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})