import React from 'react'
import jwt from 'jsonwebtoken'
import nookies from 'nookies'
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

export default function Home(props) {
  const [comunidades, setComunidades] = React.useState([]);
  const gitUser = props.githubUser;
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


// API graphQL
 fetch('https://graphql.datocms.com/', {
   method: 'POST',
   headers: {
     'Authorization': '1e5b99ba564f44efad99c0c40697e1',
     'Content-Type': 'application/json',
     'Accept': 'application/json',
   }, 
    body: JSON.stringify({ "query": `query {
      allCommunities {
        id
        title
        imageUrl
        creatorSlug
      }
    }` })
  })
  .then((response) => response.json())
  .then((respostaCompleta) => {
    const ComunidadesDados = respostaCompleta.data.allCommunities;
    console.log(ComunidadesDados)
    setComunidades(ComunidadesDados)
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
          title: dadosDeFora.get('title'),
          imageUrl: dadosDeFora.get('image'),
          creatorSlug: gitUser,
        }

        fetch('/api/comunidades', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(comunidade)
        })
        .then(async (response) => {
          const dados = await response.json();
          const comunidadeNova = dados.registroCriado;
          const comunidadesAtualizadas = [...comunidades, comunidadeNova];
          setComunidades(comunidadesAtualizadas)
        })

        
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
                <a href={`/communits/${itemAtual.id}`} >
                <img src={itemAtual.imageUrl} />
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

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  

  const { isAuthenticated } = await fetch('https://alurakut-self.vercel.app/api/auth', { 
headers: {
Authorization: token
}
})
.then((resposta) => resposta.json())

if (token === undefined) {
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    }
  }
}

if(!isAuthenticated){
  return {
    redirect:{
      destination: '/login',
      permanet: false,
    }
  }
}

console.log('isAuthenticated', isAuthenticated)


  const { githubUser } = jwt.decode(token);

  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}