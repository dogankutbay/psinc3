(function() {
    'use strict';

    $(function() {
        $('.news_container img').on('click', function() {
            $('.enlargeImageModalSource').attr('src', $(this).attr('src'));
            $('#enlargeImageModal').modal('show');
        });
    });

})();