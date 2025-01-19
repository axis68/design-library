import { PillContainer } from '../components/pills/PillContainer';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Components/PillContainer',
  component: PillContainer,
  decorators: [
    (Story) => (
      <div className="p-8 bg-gray-100">
        <div className="bg-white">
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    pills: [
      { id: 'yp', label: 'Yellow pill' }, { id: 'mp', label: 'Pill with longer text' }, 
      { id: 'cp', label: 'Cyan pill' }] 
  }
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const SmallOne = {
  args: {
      pills: [
        { id: 'yp', label: 'Yellow pill' }, { id: 'mp', label: 'Pill with longer text' }, 
        { id: 'cp', label: 'Cyan pill' }] 
    }
  };

