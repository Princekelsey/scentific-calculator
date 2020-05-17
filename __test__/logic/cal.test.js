import Calculator from "../../logic";

const cal = new Calculator();

test("should calculate addition ", () => {
  const log = `2+2`;
  cal.log = log;
  cal.equalsPressed(cal.mainDisplay());
  const actual = cal.calculatedResult();
  const expected = 4;
  expect(actual).toBe(expected);
});
