const executeCondition = {
  '>=': (a, b) => a >= b,
  '<=': (a, b) => a <= b,
  '==': (a, b) => a == b,
  '>': (a, b) => a > b,
  '<': (a, b) => a < b
}

const ifParser = condition => {
  const findTwoConditionOperator = condition.match(/(&&|\|\|)/)
      , isTwoCondition = findTwoConditionOperator?.index
      , isOr = isTwoCondition ? findTwoConditionOperator[0] === '||' : false
      , isAnd = isTwoCondition ? findTwoConditionOperator[0] === '&&' : false

  let firstCondition = ['0', '==', '1']
    , lastCondition = ['0', '==', '1']

  if (isTwoCondition) {
    const [fa, foperator, fb] = condition
                                  .slice(0, isTwoCondition)
                                  .trim()
                                  .match(/([^(<|>|=)]+|>=|<=|==|>|<)/gi)

    const [la, loperator, lb] = condition
                                  .slice(isTwoCondition + 2)
                                  .trim()
                                  .match(/([^(<|>|=)]+|>=|<=|==|>|<)/gi)

    if (
      ((fa && fa.trim) && (fb && fb.trim)) &&
      ((la && la.trim) && (lb && lb.trim))
    ) {
      let _fa = fa.trim()
        , _fb = fb.trim()

      let _la = la.trim()
        , _lb = lb.trim()

      _fa = parseInt(_fa) === _fa - 0 ? parseInt(_fa) : _fa
      _fb = parseInt(_fb) === _fb - 0 ? parseInt(_fb) : _fb

      _la = parseInt(_la) === _la - 0 ? parseInt(_la) : _la
      _lb = parseInt(_lb) === _lb - 0 ? parseInt(_lb) : _lb

      firstCondition = [
        _fa,
        foperator,
        _fb
      ]

      lastCondition = [
        _la,
        loperator,
        _lb
      ]
    }
  } else {
    const [a, operator, b] = condition
                                .trim()
                                .match(/([^(<|>|=)]+|>=|<=|==|>|<)/gi)

    if ((a && a.trim) && (b && b.trim)) {
      let _a = a.trim()
        , _b = b.trim()

      _a = parseInt(_a) === _a - 0 ? parseInt(_a) : _a
      _b = parseInt(_b) === _b - 0 ? parseInt(_b) : _b

      firstCondition = [
        _a,
        operator,
        _b
      ]
    }
  }

  if (isOr || isAnd) {
    if (isOr) {
      if (
        executeCondition[firstCondition[1]](
          firstCondition[0],
          firstCondition[2]
        )
        ||
        executeCondition[lastCondition[1]](
          lastCondition[0],
          lastCondition[2]
        )
      ) {
        return true
      } else {
        return false
      }
    }

    if (isAnd) {
      if (
        executeCondition[firstCondition[1]](
          firstCondition[0],
          firstCondition[2]
        )
        &&
        executeCondition[lastCondition[1]](
          lastCondition[0],
          lastCondition[2]
        )
      ) {
        return true
      } else {
        return false
      }
    }
  } else {
    if (
      executeCondition[firstCondition[1]](
        firstCondition[0],
        firstCondition[2]
      )
    ) {
      return true
    } else {
      return false
    }
  }
}
