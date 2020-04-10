jQuery(document).ready(function() {

  // SideNav Button Initialization
  $(".button-collapse").sideNav();
  // SideNav Scrollbar Initialization
  var sideNavScrollbar = document.querySelector('.custom-scrollbar');
  var ps = new PerfectScrollbar(sideNavScrollbar);

  $('.arrowDown').on( 'click', function() {
    $(".newsDisplay").show();
  });

  $('#dtBasicExample').DataTable();
  $('.dataTables_length').addClass('bs-select');

  // Material Select Initialization
  $('.mdb-select').material_select();

})