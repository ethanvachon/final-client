<template>
  <!-- Button trigger modal -->
  <!-- <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId">
    Launch
  </button> -->

  <!-- Modal -->
  <div class="modal fade"
       id="modelId"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <div class="modal-dialog d-flex justify-content-center" role="document">
      <div class="modal-content">
        <div class="modal-body d-flex justify-content-around">
          <div class="container-fluid">
            <div class="row">
              <div class="col-6">
                <div id="image" :style="`background: url('${keep.img}');`">
                </div>
              </div>
              <div class="col-6">
                <div class="d-flex justify-content-center border-bottom">
                  <h4>{{ keep.name }}</h4>
                  <div class="d-flex justify-content-around" id="modal-stats">
                    <i class="fas fa-eye h4 mb-0"></i>
                    <h4 class="mb-0">
                      {{ keep.views }}
                    </h4>
                  </div>
                  <div class="d-flex justify-content-around" id="modal-stats">
                    <i class="fab fa-kickstarter h4 mb-0"></i>
                    <h4 class="mb-0">
                      {{ keep.keeps }}
                    </h4>
                  </div>
                </div>
                <div class="border-bottom d-flex justify-content-center" type="button" data-dismiss="modal">
                  <router-link :to="{name: 'Profile', params: {id: keep.creator.id}}">
                    <h6 class="my-3">
                      created by: {{ keep.creator.name }}
                    </h6>
                  </router-link>
                </div>
                <div class="mt-5">
                  <h5>{{ keep.description }}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button @click="test()">
            test
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['keep'],
  setup(props) {
    return {
      test() {
        console.log(props.keep)
      }
    }
  }
}
</script>
<style scoped>
#modal-stats{
  width: 10vw;
}
#image {
  height: 40vw;
  width: auto;
  background-size:contain !important;
  background-repeat: no-repeat !important;
  border-radius: 5px 5px;
}
.modal-dialog {
  max-width: 80vw;
  margin: none;
}
</style>
