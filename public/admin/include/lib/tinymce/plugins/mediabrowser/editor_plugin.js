/*
 * LUNA content management system
 * Copyright (c) 2011, Kim Tore Jensen
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 * 
 * 2. Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * 
 * 3. Neither the name of the author nor the names of its contributors may be
 * used to endorse or promote products derived from this software without
 * specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function() {
	tinymce.create('tinymce.plugins.MediaBrowser', {
		init : function(ed, url) {
			// Register commands
			ed.addCommand('mceMediaBrowser', function() {
				// Internal image object like a flash placeholder
				if (ed.dom.getAttrib(ed.selection.getNode(), 'class').indexOf('mceItem') != -1)
					return;

				node = ed.selection.getNode();
				script = '/admin/media/browse';
				if (typeof node != 'undefined')
				{
					if (typeof node.src != 'undefined')
					{
						script = '/admin/media/browse?src=' + node.src;
						script = script + '&class=' + node.className;
					}
				}

				ed.windowManager.open({
					file : script,
					width : 800,
					height : 600,
					popup_css : false,
					inline : 1
				}, {
					plugin_url : url
				});
			});

			// Register buttons
			ed.addButton('image', {
				title : 'Media',
				cmd : 'mceMediaBrowser'
			});
		},

		getInfo : function() {
			return {
				longname : 'Media browser',
				author : 'Incendio',
				authorurl : 'http://www.incendio.no',
				version : '3.0'
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('mediabrowser', tinymce.plugins.MediaBrowser);
})();
