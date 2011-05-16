<?php
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

class Luna_Admin_Controller_Page extends Luna_Admin_Controller_Action
{
	protected $_modelName = 'Model_Pages';

	protected $_formName = 'Form_Pages';

	public function setupMenu()
	{
		$this->_menu->addsub('index');
		$this->_menu->addsub('create');
	}

	public function getForm()
	{
		parent::getForm();
		$available = $this->model->getFormTreeList();
		$this->_form->parent->setMultiOptions($available);
		$this->object = new Luna_Object_Node($this->model, $this->object->id);

		$this->_form->template->setMultiOptions($this->model->getTemplates());

		if (empty($this->object->id))
			return $this->_form;

		$this->_form->parent->removeMultiOption($this->object->id);
		$this->_form->parent->setValue($this->object->getParentId());

		if (!$this->object->isLeaf())
		{
			/* Disable moving entire trees for now. */
			$this->_form->parent->setAttrib('disabled', true);
			$this->_form->parent->setDescription('node_children_locked');
		}

		$this->_form->url->setValue($available[$this->object->getParentId()] . (substr($available[$this->object->getParentId()], -1, 1) == '/' ? null : '/') . $this->object->slug);

		return $this->_form;
	}
}