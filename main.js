import './style.css'
import 'w3-css/w3.css'
import 'material-symbols/outlined.css'

const fetchColors = async () => {
  try {
    const response = await fetch('codes.json')
    const data = await response.json()
    return data
  } catch {
    console.info('Some bug 🐞')
  }
}

window.onload = async () => {
  const colors = await fetchColors()

  const body = document.body,
    html = document.documentElement
  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  )

  const width = Math.max(
    body.scrollWidth,
    body.offsetWidth,
    html.clientWidth,
    html.scrollWidth,
    html.offsetWidth
  )

  body.style.backgroundImage = `url("https://picsum.photos/${width}/${height}/?blur")`

  const color_codes = {
    color1: null,
    color2: null,
    multiply: null,
    tolerance: null
  }
  const assign = element => {
    color_codes[element.id] = element.value
    let classname = colors[element.id].find(items => items.value === element.value)
    element.className = `w3-input w3-border${
      typeof classname !== 'undefined' ? ' ' + classname.class : ''
    }` //*😎
  }

  let value, tolerance
  const compute = () => {
    try {
      tolerance = color_codes.tolerance
      value = color_codes.color1 + color_codes.color2
      value *= Math.pow(10, color_codes.multiply)
      document.getElementById('valor').innerHTML = `${precision(value)} <b>&#937;</b>${
        !document.getElementById('precision').checked
          ? tolerance
            ? ' ' + tolerance + '%'
            : ''
          : ''
      }`
    } catch (error) {
      window.alert('Some bug 🐞')
    }
  }

  function SIa7() {
    if (value && tolerance) {
      let k, M, G
      k = value / Math.pow(10, 3)
      M = value / Math.pow(10, 6)
      G = value / Math.pow(10, 9)
      if (value > 0) {
        let RG4WKA = document.getElementById('si1')
        RG4WKA.innerHTML = k + '<b>k&#937;</b>'
        let RG4WKB = document.getElementById('si2')
        RG4WKB.innerHTML = M + '<b>M&#937;</b>'
        let RG4WKC = document.getElementById('si3')
        RG4WKC.innerHTML = G + '<b>G&#937;</b>'
      } else {
        let RG4WKA = document.getElementById('si1')
        RG4WKA.innerHTML = ''
        let RG4WKB = document.getElementById('si2')
        RG4WKB.innerHTML = ''
        let RG4WKC = document.getElementById('si3')
        RG4WKC.innerHTML = ''
      }
    }
  }

  function precision(value) {
    //! Change the text of output
    if (document.getElementById('precision').checked) {
      let Valorp = value * (tolerance / 100)
      let ValorA = value - Valorp
      let ValorB = value + Valorp
      return `${ValorA || ''} - ${ValorB || ''}`
    } else {
      return value || ''
    }
  }

  const clean = () => {
    document.getElementById('valor').innerHTML =
      document.getElementById('si1').innerHTML =
      document.getElementById('si2').innerHTML =
      document.getElementById('si3').innerHTML =
        ''
    document.getElementById('color1').value =
      document.getElementById('color2').value =
      document.getElementById('multiply').value =
      document.getElementById('tolerance').value =
        ''
    document.getElementById('color1').className =
      document.getElementById('color2').className =
      document.getElementById('multiply').className =
      document.getElementById('tolerance').className =
        'w3-input w3-border'
    value = tolerance = undefined
  }

  const new_option = (element, selectList) => {
    let option = document.createElement('option')
    option.value = element.value
    option.text = element.text
    option.className = element.class
    selectList.appendChild(option)
  }

  let selectList = document.getElementById('color1')
  colors.color1.forEach(element => new_option(element, selectList))

  selectList = document.getElementById('color2')
  colors.color2.forEach(element => new_option(element, selectList))

  selectList = document.getElementById('multiply')
  colors.multiply.forEach(element => new_option(element, selectList))

  selectList = document.getElementById('tolerance')
  colors.tolerance.forEach(element => new_option(element, selectList))

  document.getElementById('color1').addEventListener('change', event => {
    assign(event.target)
    compute()
  })

  document.getElementById('color2').addEventListener('change', event => {
    assign(event.target)
    compute()
  })

  document.getElementById('multiply').addEventListener('change', event => {
    assign(event.target)
    compute()
  })

  document.getElementById('tolerance').addEventListener('change', event => {
    assign(event.target)
    compute()
  })

  document.getElementById('precision').addEventListener('change', () => {
    compute()
  })

  document.getElementById('clean').addEventListener('click', () => {
    clean()
  })

  document.getElementById('si').addEventListener('click', () => {
    SIa7()
  })
}
