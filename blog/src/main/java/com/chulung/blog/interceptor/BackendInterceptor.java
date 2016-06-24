package com.chulung.blog.interceptor;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.chulung.blog.session.WebSessionSupport;

/**
 * backend登录拦截器
 * 
 * @author ChuKai
 *
 */
public class BackendInterceptor extends HandlerInterceptorAdapter {
	@Resource
	private WebSessionSupport webSessionSupport;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		if (webSessionSupport.islogIn()) {
			return super.preHandle(request, response, handler);
		} else {
			response.sendRedirect("/backend/logIn?reUrl=" + request.getRequestURL() + "?" + request.getQueryString());
			return false;
		}
	}

}
