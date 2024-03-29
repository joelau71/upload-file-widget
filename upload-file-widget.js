// uploadFileWidget.completeHook(name, mimeType, file)

/* $(function() { */
uploadFileWidget = {
    init: function () {
        const self = this;
        this.update();
        this.$body = $("body");

        this.$body.on("click", ".ufw-remove-btn", function () {
            var $wrapper = $(this).closest(".upload-file-widget-wrapper");
            $wrapper.find(".ufw-status").val("remove");
            $wrapper.find(".upload-file-widget").val("");
            $wrapper.find(".ufw-file").val("");
            $wrapper.find(".ufw-preview").attr("href", "");
            $wrapper.find(".ufw-download").attr("href", "");
            $wrapper.removeClass("has-data");
        });

        this.$body.on("change", ".upload-file-widget", function () {
            var $this = $(this);
            var file = $this[0].files[0];
            const name = file.name;
            var src = URL.createObjectURL(file);
            var $wrapper = $this.closest(".upload-file-widget-wrapper");
            var $preview = $wrapper.find(".ufw-preview");
            var titleFlag = $this.attr("data-ufw-custom-title") || false;
            var mimeType = file.type;
            var path = $this.val();
            var title = "";

            if (path == "") return false;

            if (titleFlag) {
                title = file.name;
            } else {
                title = "PREVIEW";
            }
            $preview.attr("href", src);
            $wrapper.find(".ufw-download").attr("href", src);
            $wrapper.find(".ufw-file").val(src);
            $wrapper.find(".ufw-status").val("upload");
            $wrapper.find(".ufw-mime-type").val(mimeType);
            $wrapper.find(".ufw-preview").text(title);
            $wrapper.addClass("has-data");

            if (typeof self.completeHook === "function")
                self.completeHook(name, mimeType, file);
        });

        this.$body.on("click", ".ufw-upload-btn", function () {
            var $wrapper = $(this).closest(".upload-file-widget-wrapper");
            var $upload = $wrapper.find(".upload-file-widget");
            $upload.trigger("click");
        });

        $(document).on("dragenter", ".ufw-upload-label", function (e) {
            e.stopPropagation();
            e.preventDefault();
        });

        $(document).on("dragover", ".ufw-upload-label", function (e) {
            e.stopPropagation();
            e.preventDefault();
        });

        $(document).on("drop", ".ufw-upload-label", function (e) {
            e.stopPropagation();
            e.preventDefault();
            var $this = $(this);
            const file = e.originalEvent.dataTransfer.files[0];
            const name = file.name;
            var src = URL.createObjectURL(file);
            var mimeType = file.type;
            var $wrapper = $this.closest(".upload-file-widget-wrapper");
            var $preview = $wrapper.find(".ufw-preview");
            var $upload = $this.find(".upload-file-widget");
            var titleFlag = $upload.attr("data-ufw-custom-title") || false;
            var title = "";

            if (titleFlag) {
                title = file.name;
            } else {
                title = "PREVIEW";
            }

            $preview.attr("href", src).text(title);
            $wrapper.find(".ufw-download").attr("href", src);
            $wrapper.find(".ufw-file").val(src);
            $wrapper.find(".ufw-status").val("upload");
            $wrapper.find(".ufw-mime-type").val(mimeType);
            $wrapper.addClass("has-data");

            if (typeof self.completeHook === "function")
                self.completeHook(name, mimeType, file);
        });
    },

    update: function () {
        var self = this;
        $(".upload-file-widget").each(function () {
            var $this = $(this);
            if ($this.hasClass("is-upload-file-widget")) return true;
            self.wrapper($this);
        });
    },

    wrapper: function ($upload) {
        var name = $upload.attr("name");
        var path = $upload.attr("data-ufw-path") || "";
        var titleFlag = $upload.attr("data-ufw-custom-title") || false;
        var remove = $upload.attr("data-ufw-remove") || false;
        var download = $upload.attr("data-ufw-download") || false;
        var has_data = path ? " has-data" : "";
        var group = $upload.attr("data-ufw-group") || "";
        var title = "";

        $upload.addClass("is-upload-file-widget");
        $upload.wrap(`<label class="ufw-upload-label ufw-btn"></label>`);
        var $label = $upload.parent();
        var text = `<span>UPLOAD</span>`;
        $label.append(text);

        $label.wrap(
            `<div class="upload-file-widget-wrapper${has_data} ${group}"></div>`
        );
        var $wrapper = $label.parent();

        if (titleFlag && path) {
            title = path;
        } else {
            title = "PREVIEW";
        }

        if (download === "true")
            $wrapper.append(
                `<a href="${path}" class="ufw-download ufw-btn ufw-link" download>DOWNLOAD</a>`
            );

        if (remove === "true")
            $wrapper.append(
                `<span class="ufw-remove-btn ufw-btn ufw-link">ROMOVE</span>`
            );

        $wrapper.append(
            `<a href="${path}" class="ufw-preview ufw-btn ufw-link" target="_blank">${title}</a>`
        );

        $wrapper.append(
            `<input type="hidden" name="ufw_file_${name}" value="${path}" class="ufw-file">`
        );

        $wrapper.append(
            `<input type="hidden" name="ufw_mime_type_${name}" value="" class="ufw-mime-type">`
        );

        $wrapper.append(
            `<input type="hidden" name="ufw_status_${name}" value="static" class="ufw-status">`
        );
    },
};
uploadFileWidget.init();
/* }); */
