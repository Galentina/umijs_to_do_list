import styles from './index.less';
import React, { useState } from 'react';
import { connect } from 'umi';


function List(props: any) {
  const {el, done, data} = props;
  const [newData, setNewData] = useState(data);
  const [updateTitle, setUpdateTitle] = useState('');               // updating process with callback to main file
  const upToDate = (id: any, data: any, title: any) => {
    let date =  [id, data, title];
    props.updateTask(date);
    setOpenButton(!openButton);
    setUpdateTitle('');
  }

  const deleteThisTask = (id: any, section: any) => {
    let date = [id, section]
    props.deleteTask(date);
  }

  const [openButton, setOpenButton] = useState(false);            // make open process for new updating input
  const makeOpen = () => {
    setOpenButton(!openButton);
  }
  const makeClose = () => {
    setOpenButton(!openButton);
  }

  const checkUpTask = (id: any, done: any) => {
    let date = [id, done];
    props.checkTask(date)
  }

  return (
    <div>
      <div className={styles.next}>
        <input type='checkbox' className={styles.check} value={el.done} checked={done}
               onChange={() => checkUpTask(el.id, el.done)}/>&nbsp;
        <span className={(el.done) ? styles.done : styles.notDone}>&#9200;&nbsp;{el.data}</span>&nbsp;&nbsp;
        <span className={(el.done) ? styles.done : styles.notDone}>&#9997;&nbsp;{el.title}</span><br/>

        <div className={styles.next}>
          {openButton &&
          <div>
            <input className={styles.input} type="date" min="2021-01-01" max="2021-12-31" value={newData}
                   onChange={(e) => setNewData(e.target.value)} required/><br/>
            <input className={(!openButton) ? styles.off : styles.input} value={updateTitle} placeholder={'Update task'}
                   onChange={(event) => setUpdateTitle(event.target.value)}/><br/>
            <button disabled={!updateTitle} className={(!openButton) ? styles.off : styles.onCheck}
                    onClick={() => upToDate(el.id, newData, updateTitle)}>&#10004;</button>
            &nbsp;
            <button className={(!openButton) ? styles.button2Non : styles.button2}
                    onClick={makeClose}>&#10008;</button>
          </div>
          }
          <button className={(openButton) ? styles.off : styles.onCheck} onClick={makeOpen}>Update</button>
          &nbsp;&nbsp;
          <button className={(openButton) ? styles.button2Non : styles.button2}
                  onClick={() => deleteThisTask(el.id, el.section)}>Delete
          </button>
          &nbsp;
        </div>
      </div>
      <br/>

    </div>
  );
}

const mapStateToProps = (state: any) => ({
  sections: state.Data.section
});

const mapDispatchToProps = (dispatch: any) => ({
  updateTask: (payload: { date: any }) => dispatch({type: "Data/upToDateTask", payload}),
  deleteTask: (payload: { date: any }) => dispatch({type: "Data/deleteTask", payload}),
  checkTask: (payload: { date: any }) => dispatch({type: "Data/checkTheTask", payload})
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
