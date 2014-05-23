/*
 * Copyright 2014 Allan Ditzel
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * com.allanditzel.spring-security-csrf-token-interceptor
 *
 * Sets up an interceptor for all HTTP requests that adds the CSRF Token Header that Spring Security requires.
 */

angular.module('com.allanditzel.spring-security-csrf-token-interceptor', [])
    .config(function($httpProvider) {
        var xhr = new XMLHttpRequest();
        xhr.open('head', '/', false);
        xhr.send();
        var csrfToken = xhr.getResponseHeader('X-CSRF-TOKEN');
        $httpProvider.interceptors.push(function($q) {
            return {
                request: function(config) {
                    config.headers['X-CSRF-TOKEN'] = csrfToken;
                    return config || $q.when(config);
                }
            };
        });
    });