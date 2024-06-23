// $(function () {
//     function initializeDataTable(selector, ajaxUrl, columns) {
//         if ($(selector).length > 0) {
//             console.log(HOST_URL);
//             $(selector).DataTable({
//                 processing: true,
//                 serverSide: true,
//                 order: [],
//                 ajax: ajaxUrl,
//                 columns: columns
//             });
//         }
//     }

//     function initializeImageDataTable(selector, ajaxUrl, columns) {
//         initializeDataTable(selector, ajaxUrl, [
//             ...columns
//         ]);
//     }

//     const socialMediaColumns = [
//         { data: 'icon', name: 'icon' },
//         { data: 'link', name: 'link' },
//         { data: 'action', name: 'action', orderable: false, searchable: false },
//     ];
//     initializeDataTable('.social-media-dataTable', '/admin/social-data', socialMediaColumns);
// });

$(function () {
    function initializeDataTable(selector, data, columns) {
        if ($(selector).length > 0) {
            $(selector).DataTable({
                processing: true,
                serverSide: false,
                order: [],
                data: data,
                columns: columns
            });
        }
    }

    const socialMediaColumns = [
        { data: 'icon', name: 'icon' },
        { data: 'link', name: 'link' },
        { data: 'action', name: 'action', orderable: false, searchable: false }
    ];
    const featureColumns = [
        { data: 'heading', name: 'heading' },
        { data: 'title', name: 'title' },
        { data: 'icon', name: 'icon' },
        { data: 'description', name: 'description' },
        { data: 'action', name: 'action', orderable: false, searchable: false }
    ];
    const projectColumns = [
        {data: 'image', name: 'image',
            render: function (data) {
                return `<img src="/static/images/${data}" height="50"/>`;
            }
        },
        { data: 'title', name: 'title' },
        { data: 'subTitle', name: 'subTitle' },
        { data: 'button', name: 'button' },
        { data: 'buttonLink', name: 'buttonLink' },
        { data: 'description', name: 'description' },
        { data: 'action', name: 'action', orderable: false, searchable: false }
    ];

    function ajax(url,dataTable,coloums,){
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                const data = response.data;
                initializeDataTable(dataTable, data, coloums);
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    ajax('/admin/social-data','.social-media-dataTable',socialMediaColumns);
    ajax('/admin/feature-data','.feature-dataTable',featureColumns);
    ajax('/admin/project-data','.project-dataTable',projectColumns);

});


function mediaDelete(id,url) {
    Swal.fire({
        title: "Are you sure?",
        text: "want to delete this item!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        reverseButtons: false
        }).then(function (result) {
        if (result.value) {
            $.get(url + id, function (res) {
                if (res.sts) {
                    window.location.reload();
                } else {
                    Swal.fire("Error", res.error || "Something Went Wrong", "error");
                }
            });
        }
    });

}
















//---------country code---------
var input = document.querySelector("#phone");
window.intlTelInput(input, ({
    initialCountry: "In"
}));

function getsubcategory() {
    let title = $("#category");
    let token = $("#csrf_token");
    let fd = new FormData();
    fd.append('id', title.val());
    fd.append('_token', token.val());
    $.ajax({
        url: HOST_URL + '/admin/get-category',
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
          let res = response.subcategories;
          $('#subcategory').empty();
            $.each(res, function(index, subcategory) {
                $('#subcategory').append('<option value="' + subcategory.id + '">' + subcategory.title + '</option>');
            });
        },
        error: function () {
            Swal.fire("Error", "Failed to add size", "error");
        }
    });
}

let i = 1;

function addsize() {
    let title = $("#size_title");
    let token = $("#csrf_token");
    if (title.val() == '') {
        Swal.fire("Error", "All Fields Are Required", "error");
        return;
    }
    let fd = new FormData();
    fd.append('title', title.val());
    fd.append('_token', token.val());

    $.ajax({
        url: HOST_URL + '/admin/products/size',
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.sts) {
                console.log(response.title);
                $("#bodysize").append('<tr><td>' + response.title + '<input type="hidden" value="' + response.title + '" name="size_title[]"></td><td><button type="button" class="btn btn-danger mr-2" onclick="removesize(event)">Delete</button></td></tr>');
                Swal.fire("SUCCESS!", "Size Added Successfully", "success");
            } else {
                Swal.fire("Error", "Something Went Wrong", "error");
            }
        },
        error: function () {
            Swal.fire("Error", "Failed to add size", "error");
        }
    });
}


function removesize(event) {
    Swal.fire({
        title: "Warning!",
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        reverseButtons: true
    }).then(function (result) {
        if (result.value) {
            // Find the parent row of the button and remove it
            $(event.target).closest('tr').remove();
        }
    });
}


function addcolor() {
    let title = $("#color_title");
    let token = $("#csrf_token");
    if (title.val() == '') {
        Swal.fire("Error", "All Fields Are Required", "error");
        return;
    }
    let fd = new FormData();
    fd.append('title', title.val());
    fd.append('_token', token.val());

    $.ajax({
        url: HOST_URL + '/admin/products/color',
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.sts) {
                console.log(response.title);
                $("#bodycolor").append('<tr><td>' + response.title + '<input type="hidden" value="' + response.title + '" name="color_title[]"></td><td><button type="button" class="btn btn-danger mr-2" onclick="removecolor(event)">Delete</button></td></tr>');
                Swal.fire("SUCCESS!", "Size Added Successfully", "success");
            } else {
                Swal.fire("Error", "Something Went Wrong", "error");
            }
        },
        error: function () {
            Swal.fire("Error", "Failed to add size", "error");
        }
    });
}


function removecolor(event) {
    Swal.fire({
        title: "Warning!",
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        reverseButtons: true
    }).then(function (result) {
        if (result.value) {
            $(event.target).closest('tr').remove();
        }
    });
}




function facEdtDelete(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "Warning!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        reverseButtons: true
    }).then(function (result) {
        if (result.value) {
            $.get("/admin/yacht/facility_delete/" + id, function (res) {
                if (res.sts) {
                    $('#facEdit' + id + '').remove();
                } else {
                    Swal.fire("Error", "Something Went Wrong", "error");
                }
            });
        }
    });
}

var j = 1;

function addImage() {
    let img_alt_text = $("#img_alt_text");
    let img_default = $("#img_default");
    if (img_alt_text.val() == '' || img_default.val() == '' || $('#img_image').length == 0 || $('#img_image')[0].files[0] == undefined) {
        Swal.fire("Error", "All Fields Are Required", "error");
        return;
    }
    Swal.fire({
        title: "WARNING!",
        text: "Please Wait...",
        icon: "warning",
        showConfirmButton: false
    });
    let token = $("#csrf_token");
    let fd = new FormData();
    let image = $('#img_image')[0].files[0];
    fd.append('image', image);
    fd.append('alt_text', img_alt_text.val());
    fd.append('default', img_default.val());
    fd.append('_token', token.val());
    $.ajax({
        url: HOST_URL + '/admin/products/image',
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        success: function (res) {
            if (res.sts) {
                j++;
                $("#bodyImage").append('<tr id="trImg' + j + '"><td><div class="symbol symbol-50 symbol-lg-120"><img src="' + res.image + '" style="height: 30px;"><input type="hidden" value="' + res.img + '" name="img_img[]"></div></td><td>' + img_alt_text.val() + '<input type="hidden" value="' + img_alt_text.val() + '" name="img_alt[]"></td><td>' +
                    res.default_val + '<input type="hidden" value="' + res.default + '" name="img_default[]"></td><td><button type="button" class="btn btn-danger mr-2" onclick="deleteImage(' + j + ')">Delete</button></td></tr>');
                $('#img_image').val('');
                img_alt_text.val('');
                img_default.val('');
                Swal.fire("SUCCESS!", "Image Added Successfully", "success");
            } else {
                Swal.fire("Error", "Something Went Wrong", "error");
            }
        }
    });
}



function deleteImage(imgId) {
    Swal.fire({
        title: "Are you sure?",
        text: "Warning!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        reverseButtons: true
    }).then(function (result) {
        if (result.value) {
            $('#trImg' + imgId + '').remove();
        }
    });
}

function deleteEdtImage(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "Warning!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        reverseButtons: true
    }).then(function (result) {
        if (result.value) {
            $.get("/admin/products/image_delete/" + id, function (res) {
                if (res.sts) {
                    $('#trImg' + id + '').remove();
                } else {
                    Swal.fire("Error", "Something Went Wrong", "error");
                }
            });
        }
    });
}


function deletesize(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "Warning!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        reverseButtons: true
    }).then(function (result) {
        if (result.value) {
            $.get("/admin/products/size_delete/" + id, function (res) {
                if (res.sts) {
                    $('#trsiz' + id + '').remove();
                } else {
                    Swal.fire("Error", "Something Went Wrong", "error");
                }
            });
        }
    });
}

function deletecolor(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "Warning!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        reverseButtons: true
    }).then(function (result) {
        if (result.value) {
            $.get("/admin/products/color_delete/" + id, function (res) {
                if (res.sts) {
                    $('#trcol' + id + '').remove();
                } else {
                    Swal.fire("Error", "Something Went Wrong", "error");
                }
            });
        }
    });
}
