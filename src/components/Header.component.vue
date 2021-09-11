<template>
  <header>
    <div class="header_logo-img">
      <router-link to="/">
        <img src="@/assets/logo.png" alt="" />
      </router-link>
    </div>

    <nav class="long-nav">
      <ul>
        <li>
          <router-link to="/">Início</router-link>
        </li>
        <li>
          <router-link to="/checkout">Carrinho</router-link>
        </li>
      </ul>
    </nav>

    <button
      id="menu-toggle"
      :class="isActive ? 'active' : ''"
      @click="toggleMenu()"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div :class="isActive ? 'mobile-nav' : 'disabled'">
      <ul>
        <li>
          <router-link to="/">Início</router-link>
        </li>
        <li>
          <router-link to="/checkout">Carrinho</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isActive: false,
    };
  },

  created() {
    window.addEventListener("scroll", this.changeColor);
  },

  destroyed() {
    window.removeEventListener("scroll", this.changeColor);
  },

  watch: {
    $route() {
      this.isActive = false;
    },
  },

  methods: {
    toggleMenu() {
      this.isActive = !this.isActive;
    },

    changeColor() {
      const header = document.querySelector("header");
      if (window.scrollY > 0) {
        header.style.backgroundColor = "#000";
        header.style.height = "60px";
      } else {
        header.style.backgroundColor = "transparent";
        header.style.height = "80px";
      }
    },
  },
};
</script>

<style scoped>
header {
  position: fixed;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 80px;
  padding: 0 100px;

  background-color: transparent;
  color: #fff;

  transition: 0.4s;
  z-index: 5;
}

.header_logo-img img {
  max-height: 40px;
}

nav ul {
  font-size: 1.2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 30px;
}

nav ul li a {
  position: relative;
  cursor: pointer;
}

nav ul li a::before {
  content: "";
  position: absolute;
  top: 100%;

  height: 2px;
  width: 0;
  background-color: #15f4a8;

  transition: 0.4s;
}

nav ul li a:hover::before {
  width: 80%;
}

.long-nav {
  display: inherit;
}

.mobile-nav {
  display: none;
}

#menu-toggle {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 5px;

  height: 40px;
  width: 40px;

  /* background: #000; */
  cursor: pointer;
  z-index: 100;

  transition: 0.4s;
}

#menu-toggle span {
  display: block;

  height: 2px;
  width: 30px;

  background: #fff;
  transition: 0.4s;
}

.mobile-nav {
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.8);
}

.mobile-nav ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 50px;

  font-size: 3rem;
  text-transform: uppercase;
}

.disabled {
  display: none;
  opacity: 0;
}

/* [aria-current="page"] {
  color: #15f4a8 !important;
} */

.active {
  gap: 0px !important;

  transition: 0.4s;
}

.active > span:nth-child(1) {
  transform: rotate(45deg);
}

.active > span:nth-child(2) {
  transform: rotate(-45deg);
}

.active > span:nth-child(3) {
  opacity: 0;
}

/* ================== RESPONSIVE ================== */
@media (max-width: 1200px) {
  header {
    padding: 0 50px;
  }
}

@media (max-width: 850px) {
  #menu-toggle {
    display: flex;
  }

  .long-nav {
    display: none;
  }
}
</style>