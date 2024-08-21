import styles from './Study.module.css';
import { useState, useEffect } from 'react';

function ProductListItem({ item }) {
  return (
    <div className={styles.ListItem}>
      <img className={styles.ItemImg} src={item.background} alt={item.name} />
      <div>
        <div>
          <p className={styles.productListName}>{item.studyName}</p>
          <p className={styles.productListFavoriteCount}>{item.point}</p>
        </div>
        <p>{item.createdAt}</p>
        <h1 className={styles.productListPrice}>{item.content}</h1>
        <p className={styles.productListFavoriteCount}>{item.reaction}</p>
        {/* <div className={styles.productListFavorite}></div> */}
      </div>
    </div>
  );
}

// const newStudy = {
//   name: 'New Study Name',
//   studyName: 'Unique Study Name',
//   content: 'Study content here',
//   background: 'GREEN',
//   password: 'securepassword',
// };

function Study({ data }) {
  return (
    <>
      <div className={styles.ListItems}>
        {data.map((item) => (
          <ProductListItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

export default Study;
