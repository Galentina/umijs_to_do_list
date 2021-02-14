import styles from './index.less';
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { connect } from 'umi';
import 'antd/dist/antd.css';


function CreateNewTask(props: any) {
  const {modal, showModal, handleOk, handleCancel, sections} = props;
  const upSections = [{name: '---'}, ...sections];

  const [newTitle, setTitle] = useState('');
  const [newData, setData] = useState('');
  const [newSection, setSection] = useState('---');

  const setUpTask = (newData: any, newSection: any, newTitle: any) => {
    let data = [newData, newSection, newTitle];
    console.log(newData, newSection, newTitle)
    props.addNewTask(data);
    setTitle('');
    setData('');
    setSection('')
  }

  return (
    <>
      <Modal title="Insert a new task" visible={modal} onOk={handleOk} onCancel={handleCancel}>
        <input className={styles.input} type="date" min="2021-01-01" max="2021-12-31" value={newData}
               onChange={(e) => setData(e.target.value)} required/><br/>
        <input className={styles.input} value={newSection} onChange={(e)=>setSection(e.target.value)} placeholder={'Add a new section'}/>&nbsp;&nbsp;
        <select className={styles.input50} value={newSection} onChange={(e)=>setSection(e.target.value)}>
          {upSections.map(el => <option>{el.name}</option>)}
        </select><br/>
        <input className={styles.input} value={newTitle} placeholder={'Add a new task'}
               onChange={(e) => setTitle(e.target.value)}/><br/>
               <hr/>
        <button className={styles.button1} onClick={() => setUpTask(newData, newSection, newTitle)}>Save task</button>&nbsp;&nbsp;
        {/*<button className={styles.button2} onClick={()=>showModal()}>Close</button>*/}
      </Modal>
    </>
  );
};

// ReactDOM.render(<App />, mountNode);

const mapStateToProps = (state: any) => ({
  tasks: state.Data.tasks,
  sections: state.Data.section
})


const mapDispatchToProps = (dispatch: any) => ({
  addNewTask: (payload: {data: any}) => dispatch({type: "Data/addNewTask", payload}),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewTask);


