import React, { Component } from "react";
import "./index.css";

export default class KanbanBoard extends Component {
  constructor() {
    super();
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.state = {
      tasks: [
        { name: '1', stage: 0 },
        { name: '2', stage: 0 },
      ],
      taskName: '',
    };
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  }


  componentDidMount() {
    if (this.state.tasks && this.state.tasks.length > 0) {
      const tasks = this.state.tasks.map((ele, ind) => ele.id = `${ind}`);
      console.log(tasks)
    }
  }


  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ taskName: value })
  }

  handleCreate = () => {
    if (this.state.taskName) {
      const tasks = this.state.tasks
      const length = tasks.length;
      let id = 0;
      if (length > 0) {
        const last = tasks[length - 1];
        id = parseInt(last.id) + 1
      } else {
        id = 0;
      }
      const obj = { name: this.state.taskName, stage: 0, id };
      const task = this.state.tasks;
      task.push(obj);
      this.setState({
        tasks: task,
        taskName: ''
      })
    }
  }

  handleDelete = (index) => {
    console.log("index", index)
    const tasks = this.state.tasks;
    if (tasks && tasks.length > 0) {
      const filterTask = tasks.filter((ele, ind) => ele.id !== index);
      // console.log(filterTask)
      this.setState({ tasks: filterTask });
    }
  }

  handleStage = (type, id) => {
    let tasks = this.state.tasks;
    if (tasks.length > 0) {
      const stages = this.stagesNames;
      const eleIndex = tasks.findIndex(ele => ele.id === id)
      if (type === 'forward' && stages.length > tasks[eleIndex].stage + 1) {
        tasks[eleIndex].stage += 1;
        this.setState({
          tasks
        })
      } else if (type === 'backward') {
        tasks[eleIndex].stage -= 1;
        this.setState({
          tasks
        })
      }
    }

  }

  render() {
    const { tasks } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <input
            id="create-task-input"
            type="text" className="large"
            placeholder="New task name"
            data-testid="create-task-input"
            value={this.state.taskName}
            onChange={(e) => this.handleChange(e)}
          />
          <button
            type="submit"
            className="ml-30"
            data-testid="create-task-button"
            onClick={() => this.handleCreate()}
          >
            Create task
          </button>
        </section>

        <div className="mt-50 layout-row">
          {stagesTasks.map((tasks, i) => {
            return (
              <div className="card outlined ml-20 mt-0" key={`${i}`}>
                <div className="card-text">
                  <h4>{this.stagesNames[i]}</h4>
                  <ul className="styled mt-50" data-testid={`stage-${i}`}>
                    {tasks.map((task, index) => {
                      return <li className="slide-up-fade-in" key={`${i}${index}`}>
                        <div className="li-content layout-row justify-content-between align-items-center">
                          <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                          <div className="icons">
                            <button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`}
                              onClick={() => this.handleStage('backward', task.id)}
                              disabled={i === 0}
                            >
                              <i className="material-icons">arrow_back</i>
                            </button>
                            {/* {console.log(index,i)} */}

                            <button
                              className="icon-only x-small mx-2"
                              data-testid={`${task.name.split(' ').join('-')}-forward`}
                              onClick={() => this.handleStage('forward', task.id)}
                              disabled={i === this.stagesNames.length - 1}
                            >
                              <i className="material-icons">arrow_forward</i>
                            </button>
                            <button
                              className="icon-only danger x-small mx-2"
                              data-testid={`${task.name.split(' ').join('-')}-delete`}
                              onClick={() => this.handleDelete(task.id)}
                            >
                              <i className="material-icons">delete</i>
                            </button>
                          </div>
                        </div>
                      </li>
                    })}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}