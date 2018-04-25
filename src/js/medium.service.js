(function (angular, undefined) {
	function MediumEditorHelperService() {
		var self = this;
		this.removeMediumEditor = function (el, selector) {
			selector = selector || ".editable";
			el.find(selector).removeAttr("contenteditable spellcheck data-medium-editor-element role aria-multiline data-medium-editor-editor-index medium-editor-index data-placeholder");
		};

		this.activateMediumEditor = function (el, selector, removeSelector) {
			selector = selector || ".editable";
			self.removeMediumEditor(el, removeSelector);
			new MediumEditor($(selector), {
				toolbar: {
					buttons: ["bold", "italic", "underline", "orderedlist", "unorderedlist"]
				},
				anchorPreview: !1,
				placeholder: !1
			});
		};
	}

	angular.module("noinfopath-biz-forms")
		.service("mediumEditorHelperService", [MediumEditorHelperService])

})(angular);
