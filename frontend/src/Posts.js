import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3000/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar as postagens:', error);
      });
  }, []);

  const handleEditClick = (post) => {
    setIsEditing(true);
    setCurrentPost(post);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentPost({});
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/posts/${id}`)
      .then(() => {
        setPosts(posts.filter(post => post.id !== id));
      })
      .catch(error => {
        console.error('Erro ao excluir a postagem:', error);
      });
  };

  const handleSaveEdit = () => {
    const { title, content, category, author } = currentPost;
    if (!title || !content || !category || !author) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    axios.put(`http://localhost:3000/posts/${currentPost.id}`, currentPost)
      .then(response => {
        const updatedPosts = posts.map(post => post.id === currentPost.id ? response.data : post);
        setPosts(updatedPosts);
        setIsEditing(false);
        setCurrentPost({});
      })
      .catch(error => {
        console.error('Erro ao atualizar a postagem:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost({
      ...currentPost,
      [name]: value,
    });
  };

  return (
    <div className="blog-container">
      <h1 className="titulo">Blog - Postagens</h1>
      {isEditing ? (
        <div className="editor-container">
          <h2 className="titulo-editor">Editar Postagem</h2>
          <input
            type="text"
            name="title"
            className="input-titulo"
            value={currentPost.title}
            onChange={handleInputChange}
            placeholder="Título"
          />
          <textarea
            name="content"
            className="input-conteudo"
            value={currentPost.content}
            onChange={handleInputChange}
            placeholder="Conteúdo"
          />
          <input
            type="text"
            name="category"
            className="input-categoria"
            value={currentPost.category}
            onChange={handleInputChange}
            placeholder="Categoria"
          />
          <input
            type="text"
            name="author"
            className="input-autor"
            value={currentPost.author}
            onChange={handleInputChange}
            placeholder="Autor"
          />
          <button className="botao-salvar" onClick={handleSaveEdit}>Salvar</button>
          <button className="botao-cancelar" onClick={handleCancelEdit}>Cancelar</button>
        </div>
      ) : (
        <div className="posts-container">
          {posts.length === 0 ? (
            <p className="mensagem-vazia">Nenhuma postagem encontrada.</p>
          ) : (
            posts.map(post => (
              <div key={post.id} className="post">
                <h2 className="post-titulo">{post.title}</h2>
                <p className="post-conteudo">{post.content}</p>
                <p className="post-categoria"><strong>Categoria:</strong> {post.category}</p>
                <p className="post-autor"><strong>Autor:</strong> {post.author}</p>
                <p className="post-data"><small>Publicado em: {post.createdAt}</small></p>
                <button className="botao-editar" onClick={() => handleEditClick(post)}>Editar</button>
                <button className="botao-excluir" onClick={() => handleDelete(post.id)}>Excluir</button>
                <hr className="divisoria" />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Posts;
