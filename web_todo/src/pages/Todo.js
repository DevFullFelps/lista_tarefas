import React, { useState, useEffect } from 'react';
import './styles/Todo.css';
import { database, ref, set, onValue, push, auth, signOut } from '../firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
    const [tasks, setTasks] = useState({});
    const [newTask, setNewTask] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingText, setEditingText] = useState('');
    const [user, setUser] = useState(null); // Estado para armazenar o usuário
    const navigate = useNavigate();

    // Usar onAuthStateChanged para verificar o estado de autenticação
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Atualiza o estado do usuário
        });

        // Limpar o listener quando o componente for desmontado
        return () => unsubscribe();
    }, []);

    // Verificar o usuário autenticado e redirecionar
    useEffect(() => {
        if (user === null) {
            return; // Não fazer nada até o estado do usuário ser carregado
        }

        if (!user) {
            navigate('/'); // Se o usuário não estiver autenticado, redireciona para a página principal
        } else {
            const tasksRef = ref(database, `todos/${user.uid}/tasks`);
            onValue(tasksRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setTasks(data);
                } else {
                    setTasks({});
                }
            });
        }
    }, [user, navigate]); // Agora dependemos apenas do `user` e `navigate`

    const addTask = () => {
        if (newTask.trim() !== '') {
            const tasksRef = ref(database, `todos/${user.uid}/tasks`);
            const newTaskRef = push(tasksRef);
            const timestamp = new Date().toLocaleString();
            set(newTaskRef, {
                text: newTask,
                completed: false,
                timestamp: timestamp
            });
            setNewTask('');
        }
    };

    const removeTask = (taskId) => {
        const taskRef = ref(database, `todos/${user.uid}/tasks/${taskId}`);
        set(taskRef, null);
    };

    const startEditing = (taskId, currentText) => {
        setEditingTaskId(taskId);
        setEditingText(currentText);
    };

    const saveEditing = (taskId) => {
        if (editingText.trim() !== '') {
            const taskRef = ref(database, `todos/${user.uid}/tasks/${taskId}`);
            set(taskRef, { ...tasks[taskId], text: editingText });
            setEditingTaskId(null);
            setEditingText('');
        }
    };

    const cancelEditing = () => {
        setEditingTaskId(null);
        setEditingText('');
    };

    const toggleTaskCompletion = (taskId) => {
        const taskRef = ref(database, `todos/${user.uid}/tasks/${taskId}`);
        set(taskRef, { ...tasks[taskId], completed: !tasks[taskId].completed });
    };

    // Função para fazer logout
    const handleLogout = async () => {
        try {
            await signOut(auth); // Faz logout do Firebase
            navigate('/'); // Redireciona para a página principal após o logout
        } catch (error) {
            console.error("Erro ao deslogar:", error);
        }
    };

    return (
        <div className='container'>
            <button onClick={() => navigate('/')} className='botao-voltar'>Voltar para a Página Principal</button>
            <div className='container-center'>
                <h3>Minha Lista de Tarefas</h3>

                {/* Campo de entrada para adicionar tarefas */}
                <input
                    type='text'
                    placeholder='Digite uma tarefa'
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                />
                <button onClick={addTask}>Adicionar Tarefa</button>

                {/* Lista de tarefas */}
                <ul>
                    {Object.keys(tasks).map((taskId) => (
                        <li key={taskId}>
                            <div className="task-content">
                                {editingTaskId === taskId ? (
                                    <input
                                        type="text"
                                        value={editingText}
                                        onChange={(e) => setEditingText(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && saveEditing(taskId)}
                                    />
                                ) : (
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
                                    <>
                                        <button onClick={() => saveEditing(taskId)}>Salvar</button>
                                        <button onClick={cancelEditing}>Cancelar</button>
                                    </>
                                ) : (
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

                {/* Botão de logout */}
                <button onClick={handleLogout} className='logout-button'>Sair</button>
            </div>
        </div>
    );
};

export default Todo;
