import React from "react";
import styles from "./NoRecordsFound.module.css";

const NoRecordsFound = () => {
  return (
    <>
      <div className={styles.no__records__wrapper}>
        <p className={styles.no__records__text}>No Records Found!!</p>
      </div>
    </>
  );
};

export default NoRecordsFound;
