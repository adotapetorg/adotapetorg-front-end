import React, { useContext, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Mensagem from './../../components/mensagem/Mensagem';
import Api from '../../services/Api';
import TituloPagina from './../../components/TituloPagina';
import Carregamento from '../../components/Carregamento';
import { AuthContext } from '../../contexts/AuthContext';

function PetCadastrar() {

    const [nome, setNome] = useState("")
    const [raca, setRaca] = useState("")
    const [dataNascimento, setDataNascimento] = useState(null)
    const [msg, setMsg] = useState("")
    const [msgTipo, setMsgTipo] = useState("warning")
    const [isLoading, setIsLoading] = useState(false)
    const { token, usuarioLogado } = useContext(AuthContext)

    function validaCampos() {
        setMsgTipo("warning")

        if (nome === "" || nome === null) {
            setMsg("Preencha o campo nome")
            return false
        }

        if (raca === "" || raca === null) {
            setMsg("Preencha o campo raça")
            return false
        }

        if (raca === "" || raca === null) {
            setMsg("Preencha o campo raça")
            return false
        }

        return true
    }

    function cadastrarPet() {
        if (validaCampos()) {
            setIsLoading(true)
            setMsg("")
            Api.post("pets", {
                usuario_id: usuarioLogado.id,
                nome: nome,
                raca: raca,
                data_nascimento: dataNascimento,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(({ data }) => {
                setMsgTipo("success")
                setMsg(data.message)
            }).catch(({ response }) => {
                setMsgTipo("danger")
                setMsg(response.data.message)
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }

    return (
        <>
            {isLoading
                ?
                <Carregamento />
                :
                <Form className="container col-md-6">
                    <Mensagem mensagem={msg} mensagemTipo={msgTipo} />

                    <TituloPagina titulo="Cadastrar Pet" />

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="nome">Nome</Form.Label>
                        <Form.Control id="nome" type="text" placeholder="Digite o nome do Pet" value={nome} required autoFocus
                            onChange={(e) => {
                                setNome(e.target.value)
                            }} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="raca">Raça</Form.Label>
                        <Form.Control id="raca" type="text" placeholder="Digite a raça do Pet" value={raca} required
                            onChange={(e) => {
                                setRaca(e.target.value)
                            }} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="dataNascimento">Data nascimento</Form.Label>
                        <Form.Control id="dataNascimento" type="date" value={dataNascimento} required 
                            onChange={(e) => {
                                setDataNascimento(e.target.value)
                            }} />
                    </Form.Group>

                    <Button variant="primary" type="submit"
                        onClick={(e) => {
                            e.preventDefault()
                            cadastrarPet()
                        }}>
                        Cadastrar
                    </Button>
                </Form>
            }
        </>
    )
}

export default PetCadastrar;