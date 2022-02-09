import {shallow} from 'enzyme'

import AppBar from 'components/AppBar'

describe('<AppBar />', () => {
  it('should render <AppBar />', () => {
    const wrapper = shallow(<AppBar />)
    expect(wrapper.length).toBe(1)
  })
})
