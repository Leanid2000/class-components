import styles from './PaginationElement.module.css';

export const PaginationElement = ({
  page,
  handleClick,
  urlPage,
}: {
  page: number;
  handleClick: (page: number) => void;
  urlPage: string;
}) => {
  //   const { page: currentPage } = useParams<{ page: string }>();
  const truePage = page + 1;
  const style =
    Number(urlPage) === truePage
      ? styles.onClickPaginationElement
      : styles.paginationElement;
  return (
    <div
      className={style}
      onClick={() => handleClick(page)}
      //   style={{
      //     backgroundColor: color,
      //   }}
    >
      {truePage}
    </div>
  );
};
