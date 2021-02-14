import styles from './index.less';
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import CreateNewTask from '@/pages/CreateNewTask';
import CreateNewSection from '@/pages/CreateNewSection';
import { connect } from 'umi';
import Deals from './Deals';


function IndexPage(props: any) {
  const { sections } = props;

  const [modal, setModal] = useState(false);
  const showModal = () => {
    setModal(true);
  };
  const handleOk = () => {
    setModal(false);
  };
  const handleCancel = () => {
    setModal(false);
  };

  const [modal1, setModal1] = useState(false);
  const showModal1 = () => {
    setModal1(true);
  };
  const handleOk1 = () => {
    setModal1(false);
  };
  const handleCancel1 = () => {
    setModal1(false);
  };

  return (
    <div className={styles.App}>
      <h1 className={styles.title}>UmiJS 🤠 To Do List</h1>
      <header className={styles.AppHeader}>My tasks</header>
      <div className={styles.inline}>
        <button className={styles.button3} onClick={showModal1}>
          Update section
        </button>
        <CreateNewSection
          modal={modal1}
          showModal={showModal1}
          handleOk={handleOk1}
          handleCancel={handleCancel1}
        />
        <button className={styles.button3} onClick={showModal}>
          Insert a new task
        </button>
        <CreateNewTask
          modal={modal}
          showModal={showModal}
          handleOk={handleOk}
          handleCancel={handleCancel}
          sections={sections}
        />
      </div>
      <hr />
      <div className={styles.row}>
        {sections.map((el: any, i: any) =>
          <Deals section={el} key={i} id={el.id}/>)}
      </div>
    </div>
  );
}


const mapStateToProps = (state: any) => ({
  sections: state.Data.section
})


export default connect(mapStateToProps)(IndexPage);
