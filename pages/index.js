import MainGrid from '../src/componentes/MainGrid'
import Box from '../src/componentes/Box'
export default function Home() {
  return (
  <MainGrid>
    {/* <Box style="grid-area: profileArea;"> */}
    <div className="profileArea" style={{ gridArea: 'profileArea' }}>
      <Box>
       imagem
    </Box>
    </div>
   <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
    <Box>
     Bem vindo
  </Box>
    </div>
    <div className="profileRealationsArea" style={{ gridArea: 'profileRealationsArea' }}>
    <Box>
      Pessoas da comunidade
      Comunidades
    </Box>
    </div>
    </MainGrid>
  )
}