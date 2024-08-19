import styles from './Input.module.css';

function Input() {
  return (
    <>
      <div>
        <p className={styles.text}>닉네임</p>
        <input className={styles.input} placeholder='닉네임을 입력해 주세요' />
        <p className={styles.text}>스터디이름</p>
        <input
          className={styles.input}
          placeholder='스터디 이름을 입력해 주세요'
        />
        <p className={styles.text}>소개</p>
        <textarea
          className={styles.textarea}
          placeholder='소개 멘트를 작성해 주세요'
        />
      </div>
    </>
  );
}

export default Input;
