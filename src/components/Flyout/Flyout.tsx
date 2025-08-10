import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store';
import { deleteAllSelectedItem } from '../../redux/selectedItemsSlice';
import styles from './Flyout.module.css';
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
    <div className={styles.flyoutBlock}>
      <a ref={link} className={styles.link}></a>
      <p
        className={styles.flyoutText}
      >{`You have selected ${selectedItems.length} Pokemon`}</p>
      <button onClick={unselectAll} className={styles.flyoutButton}>
        Unselect all
      </button>
      <button className={styles.flyoutButton} onClick={download}>
        Download
      </button>
    </div>
  );
};
