import { postLivros, getTiposLivros } from "../../services/api";
import "./Formulario.css"
import {  useEffect, useState } from 'react';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { convertBase64 } from "../../utils/file";


export const Formulario=({setRefresh})=>{
    const valorPadraoImagem = {src:'', base64: ''}
    const  [imagem,  setImagem] = useState(valorPadraoImagem);
    const  [imagemRequired,  setImagemRequired] = useState();
    const  [titulo,  setTitulo] = useState('');
    const  [tituloRequired,  setTituloRequired] = useState();
    const  [tipoLivro,  setTipoLivro] = useState('');
    const  [tipoLivroRequired,  setTipoLivroRequired] = useState();
    const  [descricao,  setDescricao] = useState('');
    const  [descricaoRequired,  setDescricaoRequired] = useState();
    const  [primeiroValor, setPrimeiroValor] = useState('');
    const  [tiposLivros,  setTiposLivros] = useState();

    useEffect(()=>{
       getTiposLivrosApi();
      }, []);
    
      const getTiposLivrosApi = async () =>{
        await getTiposLivros().then(result=>{
            setTiposLivros(result);
            setPrimeiroValor(result[0].nome);
            setTipoLivro(result[0].nome);
            }
        );
      }

    const handleChangeImagem= async(event)=>{
        const arquivoImagem = event.target.files[0];
        const imageBase64 = await convertBase64(arquivoImagem)
        setImagem({
            src: URL.createObjectURL(arquivoImagem),
            base64: imageBase64
        });

    }

    const newLivro = () => {
        return {
            imagem:imagem.base64,
            titulo:titulo,
            tipoLivro:tipoLivro,
            descricao:descricao,
        }
    }

    const handleSubmitForm = async ()=>{

        if(await isValid()){
            setRefresh(false);
            const novoLivro = newLivro();
            await postLivros(novoLivro)
            .then((result)=> {
                setRefresh(true);
                limpaCampos();
                toast.success('Operação realizada com sucesso!')
            })
            .catch((error)=>toast.error("Não foi possível realizar a inclusão de um novo livro."));
         }
    }

    const limpaCampos = () =>{
        setImagem(valorPadraoImagem);
        setTitulo('');
        setTipoLivro(primeiroValor);
        setDescricao('');
    }

    const isValid=async ()=>{

        const mensage = 'Campo Obrigatório'
        if(imagem.src === ''  && imagem.base64 === ''){
            setImagemRequired(mensage);
            return false;
        }else{
            setImagemRequired('');
        }

        if(titulo === ''){
            setTituloRequired(mensage);
            return false;
        }
        else{
            setTituloRequired('');
        }
        if(tipoLivro === ''){
            setTipoLivroRequired(mensage);
            return false;
        }
        else{
            setTipoLivroRequired('');
        }

        if(descricao === ''){
            setDescricaoRequired(mensage);
            return false;
        }
        else{
            setDescricaoRequired('');
        }

        return true
       
    }

    


    return (
    <div className="container-formulario">
        <h2>Cadastro de livro</h2>
        <form className="formulario" onSubmit={handleSubmitForm}>
            <div className="imagem-input">
                <div>
                    <label>Imagem da capa</label>
                    <img src={imagem.src} alt={`${titulo?'Imagem da capa do livro ' + titulo:''}`}  className='box-image'/>
                    <div className="box-input">
                        <label className='file-upload'>
                            <input 
                            type="file"
                            name="img"
                            id="img"
                            accept="image/*"
                            onChange={handleChangeImagem}
                            />
                            Upload de Imagem
                        </label>
                    </div>
                </div>
                {imagemRequired && <label className="campo-obrigatorio">{imagemRequired}</label>}
            </div>

            <div className="text-input">
                <div>
                    <label>Titulo do livro</label>
                    <input 
                    placeholder="Titulo do livro" 
                    type="text" 
                    name="titulo" 
                    id="titulo"
                    value={titulo}
                    onChange={(event)=> setTitulo(event.target.value)}/>
                    
                    {tituloRequired && <label className="campo-obrigatorio">{tituloRequired}</label>}
                </div>
                <div>
                    <label>Tipo do livro</label>
                    <select  onChange={(event)=> setTipoLivro(event.target.value)} value={primeiroValor}>
                        {tiposLivros && tiposLivros.map((value, index)=>{
                            return <option key={index} value={value.nome}>{value.nome}</option>
                        })}
                    </select>
                    {tipoLivroRequired && <label className="campo-obrigatorio">{tipoLivroRequired}</label>}
                </div>
                <div>
                    <label>Descrição do livro</label>
                    <textarea 
                    rows = {5} 
                    placeholder="Descrição do livro"
                    value={descricao}
                    onChange={(event)=> setDescricao(event.target.value)}
                    ></textarea>
                    {descricaoRequired && <label className="campo-obrigatorio">{descricaoRequired}</label>}
                </div>
            </div>
        </form>
        
        <div className="input-button">
            <button className="botao-form" onClick={handleSubmitForm} type="submit">
                Cadastrar
            </button>
        </div>
        <ToastContainer/>
    </div>
    )
}
