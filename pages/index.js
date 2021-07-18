import React from 'react'
import { MainGrid } from '../src/componentes/MainGrid'
import { Box } from '../src/componentes/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from "../src/lib/alurakutCommons"
import { ProfileRelationsBoxWrapper } from "../src/componentes/ProfileRelationsBoxWrapper"

function ProfileSideBar(propriedades) {
  return(
  <Box>
    <img src={`https://github.com/${propriedades.gitUser}.png`} style={{ borderRaiuds: '8px' }} />
    <hr />

    <p>
    <a className="boxLink" href={`https://https://github.com/${propriedades.gitUser}`}>
      @{propriedades.gitUser}
    </a>
    </p>
    <hr />
    

    <AlurakutProfileSidebarMenuDefault />
  </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  console.log ('oi')
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
        
      </h2>
      <ul>
        {/* { {seguidores.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={`https://github.com/${itemAtual}.png`} >
              <img src={itemAtual.image} />
              <span>{itemAtual.title}</span>
              </a>
            </li>
          )})}} */}
      </ul>
    </ProfileRelationsBoxWrapper>
    
  )
}

export default function Home() {
  const [comunidades, setComunidades] = React.useState([{
    id: '101011101',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  const gitUser = 'Dandaniel011';
  const friends = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini', 
    'marcobrunodev',
    'felipefialho'
  ]

const [seguidores, setSeguidores] = React.useState([]);
React.useEffect(function() {
  fetch('https://api.github.com/users/peas/followers')
    .then(function(respostaDoServidor) {
    return respostaDoServidor.json();
 })
 .then(function (respostaCompleta) {
    setSeguidores(respostaCompleta);
 })
},[])

 console.log('seguidore antes do return: ', seguidores);

  return (
    <>
    <AlurakutMenu />
    <MainGrid>
      {/* <Box style="grid-area: profileArea;"> */}
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfileSideBar gitUser={gitUser} />
      </div>
    <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
      <Box>
      <h1 className="title">
      Bem vindo(a)
      </h1>
    <OrkutNostalgicIconSet />
    </Box>
    <Box>
      <h2 className="subTitle">O que você deseja fazer?</h2>
      <form onSubmit={function handleCriaComunidade(e) {
        e.preventDefault()
        const dadosDeFora = new FormData(e.target)
        console.log('Campos ',dadosDeFora.get('id'));
        console.log('Campos ',dadosDeFora.get('title'));
        console.log('Campos ',dadosDeFora.get('image'));
        const comunidade = {
          id: new Date().toISOString(),
          title: dadosDeFora.get('title'),
          image: dadosDeFora.get('image'),
        }
        const comunidadesAtualizadas = [...comunidades, comunidade];
        setComunidades(comunidadesAtualizadas)
      }}>
        <div>
          <input 
            placeholder="Qual vai ser o nome da sua comunidade?" 
            name="title" 
            arial-label="Qual vai ser o nome da sua comunidade?" 
            type="text"
          />
        </div>
        <div>
          <input 
            placeholder="Coloque uma URL para usarmos de capa" 
            name="image" 
            arial-label="Coloque uma URL para usarmos de capa" 
          />
        </div>
        <button>
          Criar comunidade
        </button>
      </form>
    </Box>
      </div>
      <div className="profileRealationsArea" style={{ gridArea: 'profileRealationsArea' }}>
        <ProfileRelationsBox title="Seguidores" items={seguidores} />
        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
            Comunidades ({comunidades.length})
          </h2>
        <ul>
          {comunidades.map((itemAtual) => {
            return (
              <li key={itemAtual.id}>
                <a href={`/comunits/${itemAtual}`} >
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
              </li>
              )})}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Pessoas da Comunidade ({friends.length})
          </h2>

          <ul>
          {friends.map((itemAtual) => {
            return (
              <li key={itemAtual}>
                <a href={`/users/${itemAtual}`}>
                <img src={`https://github.com/${itemAtual}.png`} />
                <span>{itemAtual}</span>
              </a>
              </li>
              )})}
          </ul>
        </ProfileRelationsBoxWrapper>
      </div>
      </MainGrid>
      </>
  )
}