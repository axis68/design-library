import { fn } from '@storybook/test';
import { TreeMenuList } from '../components/tree-menu-list/TreeMenuList';

const options = [
  { index: "1", label: "Option 1"},
  { index: "2", label: "Option 2", subOptions: [ 
    { index: "2.1", label: "Suboption 2.1"},
    { index: "2.2", label: "Suboption 2.2", subOptions: [
      { index: "2.2.1", label: "Suboption 2.2.1" },
    ]},
  ]},
  { index: "3", label: "Option 3", subOptions: [ 
    { index: "3.1", label: "Suboption 3.1"},
    { index: "3.2", label: "Suboption 3.2"},
  ]},
];

const initialOption = { index: "2.1", label: "Suboption 2.1"};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/TreeMenuList',
  component: TreeMenuList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { options: options, selectedOption: initialOption, onChange: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const HelloPrimary = {
  args: {
    options: options,
    selectedOption: initialOption,
  },
};

