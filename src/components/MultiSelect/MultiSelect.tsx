import React, { useState } from 'react';
import { FaAngleDown, FaPlusCircle } from 'react-icons/fa';

type Props = {
  Title: string;
  allSelectItems: Array<any>;
  nextStep: (event: any) => void;
};

const MultiSelect: React.FC<Props> = ({ Title, allSelectItems, nextStep }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const [addOther, setAddOther] = useState(false);
  const [newOther, setNewOther] = useState('');
  const [openSelect, setOpenSelect] = useState(false);
  const handleSelectItem = (item: string & never) => {
    if (selectedItems.includes(item)) {
      const filteredItems = selectedItems.filter((i) => i !== item);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div className="h-64 w-1/2">
      <span className=" mb-2 block text-left text-sm font-bold text-gray-500">
        {Title}
      </span>

      <div className="relative z-10 h-4/5 w-full">
        <div className="flex items-center rounded border border-gray-200 bg-white p-1">
          {selectedItems.length > 0 ? (
            <div className="flex flex-auto flex-wrap">
              {selectedItems.map((item) => (
                <div
                  key={item}
                  className="m-1 flex items-center justify-center rounded-lg border border-gray-200 bg-gray-100 p-2"
                >
                  <span className="text-xs text-gray-700">{item}</span>

                  <FaPlusCircle
                    onClick={() => handleSelectItem(item)}
                    className=" ml-5	rotate-45 cursor-pointer fill-blue-500 text-sm hover:fill-blue-600"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="flex flex-auto cursor-pointer flex-wrap"
              onClick={() => setOpenSelect(!openSelect)}
            >
              <p className="p-2 text-lg text-gray-700">Add</p>
            </div>
          )}

          <FaAngleDown
            className="cursor-pointer fill-blue-500 text-lg hover:fill-blue-600"
            onClick={() => setOpenSelect(!openSelect)}
          />
        </div>

        <div
          className={`items--center justify--center zindex--10  absolute top--0 left--0 h-3/4 h-full w-full	overflow-y-hidden	${
            openSelect ? 'max-h-full' : 'max-h-0'
          }`}
        >
          <div className=" h-full rounded border border-gray-200 bg-white p-4">
            <span className=" mb-3 block text-left text-sm font-bold text-gray-500">
              STANDARD HEIGHTS
            </span>
            <div className="flex flex-wrap items-center">
              {allSelectItems.map((item) => (
                <div
                  key={item}
                  className=" m-1 max-w-fit cursor-pointer	 rounded-lg border border-gray-200 bg-gray-100 px-5 text-left hover:border-gray-500"
                  onClick={() => handleSelectItem(item)}
                >
                  <span className="text-xs  text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <span className=" mb-2 block text-left text-sm font-bold text-gray-500">
              CUSTOM (OTHER)
            </span>

            <div className=" relative m-1 max-w-fit	cursor-pointer rounded-lg border border-gray-200 bg-gray-100 px-5 text-left hover:border-gray-500">
              <span
                className="text-xs text-gray-700"
                onClick={() => setAddOther(!addOther)}
              >
                Please specify....
              </span>
              {addOther && (
                <form className="absolute left-full top-0 ml-3 block h-full ">
                  <input
                    id="Other"
                    name="other-number"
                    type="number"
                    required
                    min={0}
                    onChange={(e) => setNewOther(e.target.value)}
                    className="h-full appearance-none rounded-full border border-gray-200 bg-white p-2 text-sm text-gray-500 placeholder-gray-500 outline-none focus:ring-4 focus:ring-blue-200 "
                  />
                  <FaPlusCircle
                    className="absolute top-0 right-1 h-full w-5 cursor-pointer rounded-full bg-white fill-blue-500 text-lg hover:fill-blue-600"
                    type="submit"
                    onClick={() => handleSelectItem(newOther + '"')}
                  />
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        className="relative bottom-5 mb-3 block w-1/5 rounded-full bg-blue-500 px-8 py-3.5 text-center text-base font-bold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
        type="button"
        onClick={() => nextStep()}
      >
        Done
      </button>
    </div>
  );
};
export default MultiSelect;
