import { MainGrid } from '../src/componentes/MainGrid'
import { Box } from '../src/componentes/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/alurakutCommons"
import { ProfileRelationsBoxWrapper } from "../src/componentes/ProfileRelationsBoxWrapper"
//a

function ProfileSideBar(propriedades) {
  return(
  <Box>
    <img src={`https://github.com/${propriedades.gitUser}.png`} style={{ borderRaiuds: '8px' }} />
  </Box>
  )
}

export default function Home() {
  const gitUser = 'Dandaniel011';
  const friends = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini', 
    'marcobrunodev',
    'felipefialho'
  ]

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
      </div>
      <div className="profileRealationsArea" style={{ gridArea: 'profileRealationsArea' }}>
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          Pessoas da Comunidade ({friends.length})
        </h2>

        <ul>
        {friends.map((itemAtual) => {
          return (
            <li>
              <a href={`/users/${gitUser}`} key={gitUser}>
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