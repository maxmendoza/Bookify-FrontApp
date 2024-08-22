import { useState, useEffect } from "react";
import {
    Box,
    Divider,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Parallax, Pagination, Navigation } from "swiper/modules";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import bookService from '../../shared/service/Book';

export default function SwiperView() {

    return (
        <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
          width: "100%",
          height: "100%",
          background: "#000",
          borderRadius: 5,
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        className="mySwiper"
      >
        <Box
          slot="container-start"
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "130%",
            height: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage:
              "url(https://cdn.pixabay.com/photo/2016/11/29/12/50/bookcases-1869616_1280.jpg)",
          }}
          data-swiper-parallax="-23%"
        />
        <SwiperSlide>
          <Box
            sx={{
              padding: 4,
            }}
          >
            <Box
              className="title"
              sx={{ fontSize: 41, fontWeight: 300 , color: '#F05600' }}
              data-swiper-parallax="-300"
            >
              BIENVENIDO
            </Box>
            <Box
              className="subtitle"
              sx={{ fontSize: 21 , color: '#FFC107'}}
              data-swiper-parallax="-200"
            >
              ¡Feliz lectura!
            </Box>
            <Box
              className="text"
              sx={{ fontSize: 14, maxWidth: 400, lineHeight: 1.3, color: 'white' }}
              data-swiper-parallax="-100"
            >
              <p>
              Nos alegra que te unas a nuestra comunidad de lectores y amantes de los libros. Aquí podrás explorar una vasta colección de libros, desde los clásicos hasta las últimas novedades, todo al alcance de un clic.
                tincidunt ut libero. Aenean feugiat non eros quis feugiat.
              </p>
            </Box>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            sx={{
              padding: 4, // Puedes ajustar este valor según sea necesario
            }}
          >
            <Box
              className="title"
              sx={{ fontSize: 41, fontWeight: 300 , color: '#F05600' }}
              data-swiper-parallax="-300"
            > BIENVENIDO
            </Box>
            <Box
              className="subtitle"
              sx={{ fontSize: 21 , color: '#FFC107'}}
              data-swiper-parallax="-200"
            >
              ¡Feliz lectura!
            </Box>
            <Box
              className="text"
              sx={{ fontSize: 14, maxWidth: 400, lineHeight: 1.3, color: 'white' }}
              data-swiper-parallax="-100"
            >
              <p>
              Nos alegra que te unas a nuestra comunidad de lectores y amantes de los libros. Aquí podrás explorar una vasta colección de libros, desde los clásicos hasta las últimas novedades, todo al alcance de un clic.
                tincidunt ut libero. Aenean feugiat non eros quis feugiat.
              </p>
            </Box>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            sx={{
              padding: 4, 
            }}
          >
            <Box
              className="title"
              sx={{ fontSize: 41, fontWeight: 300 , color: '#F05600' }}
              data-swiper-parallax="-300"
            >
              BIENVENIDO
            </Box>
            <Box
              className="subtitle"
              sx={{ fontSize: 21 , color: '#FFC107'}}
              data-swiper-parallax="-200"
            >
              ¡Feliz lectura!
            </Box>
            <Box
              className="text"
              sx={{ fontSize: 14, maxWidth: 400, lineHeight: 1.3, color: 'white' }}
              data-swiper-parallax="-100"
            >
              <p>
              Nos alegra que te unas a nuestra comunidad de lectores y amantes de los libros. Aquí podrás explorar una vasta colección de libros, desde los clásicos hasta las últimas novedades, todo al alcance de un clic.
                tincidunt ut libero. Aenean feugiat non eros quis feugiat.
              </p>
            </Box>
          </Box>
        </SwiperSlide>
      </Swiper>
    );
}