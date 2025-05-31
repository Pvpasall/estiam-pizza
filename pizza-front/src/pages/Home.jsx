import React from 'react'
import '../css/Home.css';
function Home() {
  return (
    <div className='container'>
        <div className='accueil'>
            <h2 className='souhait'>Bienvenue</h2>
            <h1 className='couleur'>Nous préparons des pizza rapidement et avec le respect d'hiègiene <br /> Lancez vous</h1>
            <h2 className='couleur2'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, excepturi. <br /> Magnam facilis et iure, laudantium quos nemo sit consequatur!</h2>

            {/* <div className='valide'>
                <button className='couleur3'>Voir menu</button>
            </div> */}
        </div>
    </div>
  )
}

export default Home