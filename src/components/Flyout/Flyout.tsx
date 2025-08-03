import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store';
import { deleteAllSelectedItem } from '../../redux/selectedItemsSlice';
import './Flyout.css';
import { useRef } from 'react';

export const Flyout = () => {
  const link = useRef<HTMLAnchorElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );
  const selectedItemsInformation = useSelector(
    (state: RootState) => state.selectedItems.itemsInfo
  );

  const download = () => {
    const blob = new Blob([JSON.stringify(selectedItemsInformation)], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    if (link.current) {
      link.current.href = url;
      link.current.download = `${selectedItems.length}_items.csv`;
      link.current.click();
      URL.revokeObjectURL(url);
    }
  };
  const unselectAll = () => {
    dispatch(deleteAllSelectedItem());
  };
  return (
    <div className="flyoutBlock">
      <a ref={link} className="link"></a>
      <p className="flyoutText">{`You have selected ${selectedItems.length} Pokemon`}</p>
      <button onClick={unselectAll} className="flyoutButton">
        Unselect all
      </button>
      <button className="flyoutButton" onClick={download}>
        Download
      </button>
    </div>
  );
};
