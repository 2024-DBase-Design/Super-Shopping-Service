import { ClientEventEmitter } from '@/helpers/clientEventEmitter';
import { debounce } from 'lodash';

const SearchComponent: React.FC<{
  eventEmitter: ClientEventEmitter;
}> = ({ eventEmitter }) => {
  const handleInputChange = debounce((value) => {
    eventEmitter.emit('searched', value);
  }, 300);

  return (
    <>
      <div>
        <input
          className="m-auto rounded-lg"
          placeholder="Search..."
          type="text"
          onChange={(event) => handleInputChange(event.target.value)}
        ></input>
      </div>
    </>
  );
};

export default SearchComponent;
