import { ButtonHTMLAttributes, ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import Logo from './assets/logo'
import { Check, PlusCircle, Trash } from 'phosphor-react'
import Clipboard from './assets/clipboard'
import { TaskItem } from './components/TaskItem';

interface Task {
  text: string;
  done: boolean;
}

function App() {

  const [listTasks, setListTasks] = useState<Task[]>([])
  const [newTaskText, setNewTaskText] = useState('')
  const [checkExistTask, setCheckExistTask] = useState(false)
  const tasksDone = listTasks.filter(t => t.done === true).length

	function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
		event.target.setCustomValidity('')
		setNewTaskText(event.target.value)

    if(listTasks.filter(t => t.text === event.target.value).length > 0) {
      setCheckExistTask(true)
    } else {
      setCheckExistTask(false)
    }
	}

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const task =  {
      text: newTaskText,
      done: false
    }

    setListTasks([...listTasks, task])
    setNewTaskText('')
  }

  function editTaskStatus(task: Task) {
    const indexToEdit = listTasks.findIndex(t => t.text == task.text)
    const tasks = listTasks

    tasks[indexToEdit].done = !task.done
    setListTasks([...tasks])
  }

  function deleteTask(task: Task) {
    const tasks = listTasks.filter(t => t !== task)
    setListTasks([...tasks])
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório.')
  }

  return (
    <div className='min-h-screen'>
      <header className="bg-gray-700 flex flex-1 justify-center items-center h-52">
        <Logo />
      </header>
      <main className='flex flex-1 items-center mt-[-1.75rem] flex-col'>
        <form className='flex gap-2' onSubmit={handleCreateNewTask}>
          <div className='flex flex-col'>
            <input 
              className='w-[39rem] rounded-lg gap-2 p-4 h-14 bg-gray-500 border border-gray-700 placeholder-gray-300 focus:border-purpleDark focus:outline-none'
              placeholder='Adicione uma nova tarefa'
              value={newTaskText}
              onChange={handleNewTaskChange}
              onInvalid={handleNewTaskInvalid}
              required
            />
            {checkExistTask && <span className='text-xs text-danger p-2'>Não é possível adicionar uma tarefa com o mesmo texto.</span>}
          </div>

          <button 
            disabled={checkExistTask}
            className='rounded-lg gap-2 w-24 h-14 flex justify-center items-center bg-blueDark hover:bg-blue disabled:opacity-80 disabled:cursor-not-allowed'>
              <span className='font-bold text-sm'>Criar</span>
              <PlusCircle size={20} />
          </button>
        </form>

        <div className="w-[46rem] p-2 mt-16 flex flex-col flex-1">
            <div className="flex justify-between">
                <div className="flex">
                    <h1 className="text-sm font-bold text-blue">Tarefas criadas</h1>
                    <span className="text-xs rounded-lg bg-gray-400 text-gray-200 font-bold pl-2 pr-2 pt-0.5 pb-0.5 ml-2">{listTasks.length}</span>
                </div>

                <div className="flex">
                    <h1 className="text-sm font-bold text-purple">Concluídas</h1>
                    <span className="text-xs rounded-lg bg-gray-400 text-gray-200 font-bold pl-2 pr-2 pt-0.5 pb-0.5 ml-2">
                      {
                        listTasks.length === 0 ? 
                        '0' :
                        `${tasksDone} de  ${listTasks.length}`
                      }
                    </span>
                </div>
            </div>

            <div className="min-h-[15rem] rounded-lg border-t border-gray-400 mt-6 flex justify-center items-center flex-col">
                {listTasks.length === 0 ? (
                  <>
                    <Clipboard />
                    <h1 className='font-bold text-gray-300 mt-4'>
                        Você ainda não tem tarefas cadastradas
                    </h1>
                    <span className='text-gray-300'>
                        Crie tarefas e organize seus itens a fazer.
                    </span>
                  </>
                ) : (
                    listTasks.map(task => (
                      <TaskItem 
                        key={task.text}
                        task={task}
                        onDeleteTask={deleteTask}
                        onEditTaskStatus={editTaskStatus}
                      />
                    ))
                )}
                
            </div>
        </div>
      </main>
    </div>
  )
}

export default App
