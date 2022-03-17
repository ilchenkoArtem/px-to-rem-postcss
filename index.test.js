const postcss = require('postcss')

const plugin = require('./')

async function run (input, output, opts = { }) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('Must be change base property value to px', async () => {
  await run(
    'a{font-size: $rem(20); padding: 20px $rem(20)}',
    'a{font-size: 1.25rem; padding: 20px 1.25rem}',
    {})
})

it('css variable value must be change to px', async () => {
  await run(
    ':root {--font-size: $rem(20)}',
    ':root {--font-size: 1.25rem}',
    {})
})
