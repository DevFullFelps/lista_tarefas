import React, { useState, useEffect } from 'react';
import './styles/Todo.css';
import { database, ref, set, onValue, push } from '../firebase';

const Todo = () => {
    const [tasks, setTasks] = useState({}); // Estado para a lista de tarefas (agora um objeto)
    const [newTask, setNewTask] = useState(''); // Estado para o valor da nova tarefa
    const [editingTaskId, setEditingTaskId] = useState(null); // Estado para controlar qual tarefa está sendo editada
    const [editingText, setEditingText] = useState(''); // Estado para o texto da tarefa em edição

    // Referência para o banco de dados
    const tasksRef = ref(database, 'tasks');

    // Carregar tarefas do Firebase quando a página é carregada
    useEffect(() => {
        onValue(tasksRef, (snapshot) => {
            const data = snapshot.val();
            console.log("Dados carregados do Firebase:", data); // Log dos dados
            if (data) {
                setTasks(data);
            } else {
                setTasks({});
            }
        });
    }, );

    // Função para adicionar uma nova tarefa
    const addTask = () => {
        if (newTask.trim() !== '') { // Verifica se a tarefa não está vazia
            const newTaskRef = push(tasksRef); // Gera uma referência com um ID único
            const timestamp = new Date().toLocaleString(); // Obtém a data e hora atual
            set(newTaskRef, { 
                text: newTask, 
                completed: false, 
                timestamp: timestamp 
            }); // Salva a nova tarefa no Firebase

            setNewTask(''); // Limpa o campo de entrada
        }
    };

    // Função para remover uma tarefa
    const removeTask = (taskId) => {
        const taskRef = ref(database, `tasks/${taskId}`);
        set(taskRef, null); // Remove a tarefa do Firebase
    };

    // Função para iniciar a edição de uma tarefa
    const startEditing = (taskId, currentText) => {
        setEditingTaskId(taskId);
        setEditingText(currentText);
    };

    // Função para salvar a edição de uma tarefa
    const saveEditing = (taskId) => {
        if (editingText.trim() !== '') {
            const taskRef = ref(database, `tasks/${taskId}`);
            set(taskRef, { ...tasks[taskId], text: editingText }); // Atualiza a tarefa no Firebase
            setEditingTaskId(null); // Finaliza a edição
            setEditingText(''); // Limpa o campo de edição
        }
    };

    // Função para cancelar a edição de uma tarefa
    const cancelEditing = () => {
        setEditingTaskId(null);
        setEditingText('');
    };

    // Função para marcar/desmarcar uma tarefa como concluída
    const toggleTaskCompletion = (taskId) => {
        const taskRef = ref(database, `tasks/${taskId}`);
        set(taskRef, { ...tasks[taskId], completed: !tasks[taskId].completed }); // Alterna o estado de conclusão
    };

    return (
        <div className='container'>
            <div className='container-center'>
                <h3>Minha Lista de Tarefas</h3>

                {/* Campo de entrada para adicionar tarefas */}
                <input 
                    type='text'
                    placeholder='Digite uma tarefa'
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTask()} // Adiciona tarefa ao pressionar Enter
                />

                {/* Botão para adicionar tarefa */}
                <button onClick={addTask}>Adicionar Tarefa</button>

                {/* Lista de tarefas */}
                <ul>
                    {Object.keys(tasks).map((taskId) => (
                        <li key={taskId}>
                            <div className="task-content">
                                {editingTaskId === taskId ? (
                                    // Modo de edição
                                    <input
                                        type="text"
                                        value={editingText}
                                        onChange={(e) => setEditingText(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && saveEditing(taskId)}
                                    />
                                ) : (
                                    // Modo de visualização
                                    <>
                                        <span className={`task-text ${tasks[taskId].completed ? 'completed' : ''}`}>
                                            {tasks[taskId].text}
                                        </span>
                                        <span className="task-timestamp">{tasks[taskId].timestamp}</span>
                                    </>
                                )}
                            </div>
                            <div className="task-actions">
                                {editingTaskId === taskId ? (
                                    // Botões durante a edição
                                    <>
                                        <button onClick={() => saveEditing(taskId)}>Salvar</button>
                                        <button onClick={cancelEditing}>Cancelar</button>
                                    </>
                                ) : (
                                    // Botões durante a visualização
                                    <>
                                        <button 
                                            onClick={() => toggleTaskCompletion(taskId)}
                                            className={tasks[taskId].completed ? 'completed-button' : 'complete-button'}
                                        >
                                            {tasks[taskId].completed ? 'Desmarcar' : 'Concluir'}
                                        </button>
                                        <button onClick={() => startEditing(taskId, tasks[taskId].text)}>Alterar</button>
                                        <button onClick={() => removeTask(taskId)}>Remover</button>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Todo;