import React from "react";

import { configure, shallow } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = mockStore({});

describe("<NavigatonItems />", () => {
  it("should render two <NavigationItem /> elements if not authenticated", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <NavigationItems />
      </Provider>
    );
    expect(wrapper.find(<NavigationItem />)).toHaveLength(2);
  });
});
