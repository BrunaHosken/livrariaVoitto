import "./Card.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export const Card=({tipo, livros})=>{
    return ( 
    <div className="card" >
       <h3>{tipo}</h3>
       <Swiper navigation modules={[Navigation]}>
          {livros && livros.map((value, index)=>{
               return(<SwiperSlide  key={index}>
                    <div className="card-image">
                         <img className="livro-imagem" src={value.imagem} alt= {`Imagem da capa do livro ${value.titulo}`} />
                    </div>
                    <div className="card-body">
                         <h4>{value.titulo}</h4>
                         <p>{value.descricao}</p>
                    </div>
               </SwiperSlide>
          )})}
      </Swiper>
    </div>
    )
}
