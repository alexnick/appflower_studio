<?php
/**
 * This module provides backend functionality for Plugins manage
 *
 * @package    appFlowerStudio
 * @subpackage plugin
 * @author     Sergey Startsev <startsev.sergey@gmail.com>
 */
class afsPluginManagerActions extends sfActions
{
    /**
     * Catching executing ajax queries from direct call
     */
    public function preExecute()
    {
        if (!$this->getRequest()->isXmlHttpRequest()) {
            $this->forward404("This action should be used only for ajax requests");
        }
    }

    /**
     * Rendering json
     *
     * @param mixed $result 
     * @return string
     * @author Sergey Startsev
     */
    protected function renderJson($result)
    {
        $this->getResponse()->setHttpHeader("Content-Type", 'application/json');
        
        return $this->renderText(json_encode($result));
    }

    /**
     * Getting plugins list controller
     *
     * @param sfWebRequest $request 
     * @author Sergey Startsev
     */
    public function executeGetList(sfWebRequest $request)
    {
        $response = afStudioCommand::process('plugin', 'getList');

        return $this->renderJson($response['data']);
    }
    
    /**
     * Rename plugin action 
     *
     * @param sfWebRequest $request 
     * @author Sergey Startsev
     */
    public function executeRename(sfWebRequest $request)
    {
        $parameters = array(
            'oldValue' => $request->getParameter('oldValue'),
            'newValue' => $request->getParameter('newValue')
        );
        
        $response = afStudioCommand::process('plugin', 'rename', $parameters);
        
        return $this->renderJson($response);
    }
    
    /**
     * Delete plugin action
     *
     * @param sfWebRequest $request 
     * @author Sergey Startsev
     */
    public function executeDelete(sfWebRequest $request)
    {
        $parameters = array(
            'name' => $request->getParameter('name'),
        );
        
        $response = afStudioCommand::process('plugin', 'delete', $parameters);
        
        return $this->renderJson($response);
    }
    
    /**
     * Add new plugin action
     *
     * @param sfWebRequest $request 
     * @author Sergey Startsev
     */
    public function executeAdd(sfWebRequest $request)
    {
        $parameters = array(
            'name' => $request->getParameter('name')
        );
        
        $response = afStudioCommand::process('plugin', 'add', $parameters);
        
        return $this->renderJson($response);
    }
    
}
