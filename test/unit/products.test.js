describe("Calc Test", () => {
  test("2+2", () => {
    expect(2 + 2).toBe(4);
  });

  test("2+2 !== 5", () => {
    expect(2 + 2).not.toBe(5);
  });
});
