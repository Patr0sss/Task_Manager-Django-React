import { useState } from "react";
import styles from "./toDoBar.module.css";

export default function ToDoBar({
  index,
  id,
  title,
  completed,
  content,
  onDelete,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onCompletedChange,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDescriptionChange,
}: {
  index: number;
  id: number;
  title: string;
  completed: boolean;
  content: string;
  onDelete: (id: number) => Promise<void>;
  onCompletedChange: (id: number, completed: boolean) => void;
  onDescriptionChange: (id: number, content: string) => void;
}) {
  const [isCompleted, setIsCompleted] = useState<boolean>(completed);
  const [isDeatilClicked, setIsDetailClicked] = useState<boolean>(false);
  const [isEditingContent, setIsEditingContent] = useState<boolean>(false);
  const [taskDescription, setTaskDescription] = useState<string>(content);
  const [newDescription, setNewDescription] = useState<string>(taskDescription);

  return (
    <>
      <div className={styles.toDoBar}>
        <div className={styles.index}>{index}</div>
        <div className={styles.title}>{title}</div>
        <input
          type="checkbox"
          defaultChecked={completed}
          className={styles.checkBox}
          onClick={() => {
            setIsCompleted((prev) => !prev);
            onCompletedChange(id, !isCompleted);
          }}
        />
        <div
          className={styles.status}
          style={{ backgroundColor: isCompleted ? "green" : "#DAA520" }}
        >
          {isCompleted ? "completed" : "in progress"}
        </div>
        <div
          className={styles.details}
          onClick={() => setIsDetailClicked((prev) => !prev)}
        >
          Details
        </div>
        <div
          className={styles.delete}
          onClick={() => {
            onDelete(id);
          }}
        >
          X
        </div>
      </div>
      {isDeatilClicked ? (
        <>
          <div
            onClick={() => setIsDetailClicked(false)}
            className={styles.toDoBarDeatilsBackGround}
          ></div>
          <div
            className={styles.toDoBarDeatilsTable}
            style={{ height: isEditingContent ? "750px" : "500px" }}
          >
            <div className={styles.deatilsTopBar}>
              <div>{index}.</div>
              <div>{title}</div>
              <div
                onClick={() => setIsDetailClicked(false)}
                style={{ cursor: "pointer" }}
              >
                X
              </div>
            </div>

            <div className={styles.toDoBarDetailsCenter}>
              <div className={styles.contentContainer}>
                {taskDescription === ""
                  ? "Task Description ..."
                  : taskDescription}
              </div>

              {isEditingContent ? (
                <>
                  <textarea
                    className={styles.textAreaEditConent}
                    placeholder="Type New Task Description ..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                  <div className={styles.editConentButtons}>
                    <div
                      className={styles.editConentSubmitButton}
                      onClick={() => {
                        setTaskDescription(newDescription);
                        setIsEditingContent(false);
                        onDescriptionChange(id, newDescription);
                      }}
                    >
                      Submit
                    </div>
                    <div
                      className={styles.editConentCancelButton}
                      onClick={() => setIsEditingContent(false)}
                    >
                      Cancel
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className={styles.editButton}
                  onClick={() => setIsEditingContent(true)}
                >
                  EDIT
                </div>
              )}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
