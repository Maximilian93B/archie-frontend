   ## Overview
     This document provides comprehensive context for implementing AI tagging features in the Archivus frontend. The backend automatically generates 6-10 high-quality tags when documents are processed, and
      these tags are available for display, filtering, and management.

     ## Feature Summary
     - **Automatic AI Tagging**: Documents are automatically tagged during AI processing
     - **Tag Count**: 6-10 tags per document
     - **Tag Types**: AI-generated tags and user-created tags
     - **Tag Scoring**: Each AI tag has confidence and relevance scores
     - **Categories**: Tags are organized by categories (document_type, department, topic, etc.)

     ## API Endpoints

     ### 1. Get Document with Tags
     ```http
     GET /api/v1/documents/:id
     Authorization: Bearer {token}
     ```

     **Response includes:**
     ```json
     {
       "id": "uuid",
       "title": "Q4 Financial Report",
       "ai_categories": ["document_type", "department", "year"],
       // ... other document fields
     }
     ```

     ### 2. Get Document Tags
     ```http
     GET /api/v1/documents/:id/tags
     Authorization: Bearer {token}
     ```

     **Response:**
     ```json
     {
       "tags": [
         {
           "name": "invoice",
           "category": "document_type",
           "confidence": 0.95,
           "relevance": 0.98
         },
         {
           "name": "finance",
           "category": "department",
           "confidence": 0.88,
           "relevance": 0.85
         }
       ],
       "user_tags": ["important", "review-needed"],
       "categories": ["document_type", "department", "priority"]
     }
     ```

     ### 3. Add User Tags
     ```http
     POST /api/v1/documents/:id/tags
     Authorization: Bearer {token}
     Content-Type: application/json

     {
       "tags": ["urgent", "client-xyz"]
     }
     ```

     ### 4. Remove Tag
     ```http
     DELETE /api/v1/documents/:id/tags/:tagName
     Authorization: Bearer {token}
     ```

     ### 5. Search by Tags
     ```http
     GET /api/v1/documents?tags=invoice,finance&tag_match=any
     Authorization: Bearer {token}
     ```

     Parameters:
     - `tags`: Comma-separated list of tag names
     - `tag_match`: "any" (OR) or "all" (AND)

     ## Data Structures

     ### AI Tag Structure
     ```typescript
     interface AITag {
       name: string;
       category: TagCategory;
       confidence: number;  // 0.0 - 1.0
       relevance: number;   // 0.0 - 1.0
     }

     type TagCategory =
       | "document_type"
       | "department"
       | "project"
       | "topic"
       | "compliance"
       | "priority"
       | "year"
       | "month"
       | "client"
       | "vendor";
     ```

     ### Document Tags Response
     ```typescript
     interface DocumentTagsResponse {
       tags: AITag[];           // AI-generated tags with metadata
       user_tags: string[];     // User-created tags (simple strings)
       categories: string[];    // List of categories present
       keywords?: string[];     // Optional keywords from AI analysis
       topics?: string[];       // Optional topics from AI analysis
     }
     ```

     ### Tag Display Priority
     Tags are ranked by score for display:
     - **AI tags**: `score = confidence × relevance`
     - **User tags**: Fixed score of `0.9`
     - Display top 3-5 tags in thumbnails/cards

     ## UI/UX Guidelines

     ### 1. Tag Display in Document Cards/Thumbnails
     ```jsx
     // Example React component structure
     <DocumentCard>
       <TagContainer>
         {/* Show top 3-5 tags */}
         <Tag type="ai" confidence={0.95}>invoice</Tag>
         <Tag type="ai" confidence={0.88}>finance</Tag>
         <Tag type="user">important</Tag>
         {/* Show "+N more" if more tags exist */}
         {remainingCount > 0 && <MoreTags>+{remainingCount} more</MoreTags>}
       </TagContainer>
     </DocumentCard>
     ```

     ### 2. Visual Differentiation
     - **AI Tags**:
       - Display with confidence indicator (color intensity or small bar)
       - Icon: 🤖 or AI badge
       - Color: Primary/blue tones
       - Tooltip: Show confidence and relevance scores

     - **User Tags**:
       - Solid color without confidence indicator
       - Icon: 👤 or user badge
       - Color: Secondary/gray tones
       - Editable/deletable by user

     ### 3. Tag Categories Color Scheme
     ```css
     /* Suggested category colors */
     .tag-document_type { background-color: #3B82F6; }  /* Blue */
     .tag-department { background-color: #10B981; }     /* Green */
     .tag-project { background-color: #8B5CF6; }        /* Purple */
     .tag-topic { background-color: #F59E0B; }          /* Amber */
     .tag-compliance { background-color: #EF4444; }     /* Red */
     .tag-priority { background-color: #EC4899; }       /* Pink */
     .tag-year { background-color: #6366F1; }           /* Indigo */
     .tag-client { background-color: #14B8A6; }         /* Teal */
     ```

     ### 4. Tag Confidence Visualization
     ```jsx
     // Confidence indicator component
     <TagConfidence confidence={0.95}>
       <ConfidenceBar width={`${confidence * 100}%`} />
       <ConfidenceText>{(confidence * 100).toFixed(0)}%</ConfidenceText>
     </TagConfidence>
     ```

     ### 5. Tag Filtering Interface
     ```jsx
     <TagFilter>
       <FilterSection title="AI Tags">
         {aiTags.map(tag => (
           <FilterTag
             key={tag.name}
             selected={selectedTags.includes(tag.name)}
             onClick={() => toggleTag(tag.name)}
           >
             {tag.name}
             <TagCount>{tag.count}</TagCount>
           </FilterTag>
         ))}
       </FilterSection>

       <FilterSection title="User Tags">
         {userTags.map(tag => (
           <FilterTag key={tag} ... />
         ))}
       </FilterSection>
     </TagFilter>
     ```

     ## Implementation Examples

     ### 1. Tag Component with Confidence
     ```tsx
     interface TagProps {
       name: string;
       type: 'ai' | 'user';
       category?: string;
       confidence?: number;
       relevance?: number;
       onRemove?: () => void;
     }

     const Tag: React.FC<TagProps> = ({
       name,
       type,
       category,
       confidence,
       onRemove
     }) => {
       const score = confidence && relevance ? confidence * relevance : 0;

       return (
         <div className={`tag tag-${type} tag-${category}`}>
           {type === 'ai' && <AIIcon />}
           <span>{name}</span>
           {type === 'ai' && confidence && (
             <ConfidenceIndicator value={confidence} />
           )}
           {type === 'user' && onRemove && (
             <RemoveButton onClick={onRemove} />
           )}
         </div>
       );
     };
     ```

     ### 2. Document List with Tag Filtering
     ```tsx
     const DocumentList = () => {
       const [selectedTags, setSelectedTags] = useState<string[]>([]);
       const [tagMatchMode, setTagMatchMode] = useState<'any' | 'all'>('any');

       const { data: documents } = useQuery({
         queryKey: ['documents', selectedTags, tagMatchMode],
         queryFn: () => fetchDocuments({
           tags: selectedTags.join(','),
           tag_match: tagMatchMode
         })
       });

       return (
         <div>
           <TagFilterPanel
             selectedTags={selectedTags}
             onTagsChange={setSelectedTags}
             matchMode={tagMatchMode}
             onMatchModeChange={setTagMatchMode}
           />
           <DocumentGrid documents={documents} />
         </div>
       );
     };
     ```

     ### 3. Tag Management in Document Detail
     ```tsx
     const DocumentDetail = ({ documentId }) => {
       const { data: tagData } = useDocumentTags(documentId);
       const addTag = useAddDocumentTag(documentId);
       const removeTag = useRemoveDocumentTag(documentId);

       return (
         <TagSection>
           <h3>AI-Generated Tags</h3>
           <TagList>
             {tagData?.tags.map(tag => (
               <Tag
                 key={tag.name}
                 {...tag}
                 type="ai"
                 tooltip={`Confidence: ${(tag.confidence * 100).toFixed(0)}%, Relevance: ${(tag.relevance * 100).toFixed(0)}%`}
               />
             ))}
           </TagList>

           <h3>Your Tags</h3>
           <TagList>
             {tagData?.user_tags.map(tag => (
               <Tag
                 key={tag}
                 name={tag}
                 type="user"
                 onRemove={() => removeTag.mutate(tag)}
               />
             ))}
             <AddTagButton onClick={() => {/* show add tag modal */}} />
           </TagList>
         </TagSection>
       );
     };
     ```

     ## State Management

     ### Redux/Zustand Store Structure
     ```typescript
     interface TagState {
       // Cache of tags by document ID
       documentTags: Record<string, DocumentTagsResponse>;

       // Available tags for filtering
       availableTags: {
         ai: Array<{ name: string; count: number; category: string }>;
         user: Array<{ name: string; count: number }>;
       };

       // Current filter state
       filter: {
         selectedTags: string[];
         matchMode: 'any' | 'all';
       };
     }
     ```

     ## Performance Considerations

     1. **Tag Caching**: Tags are cached on the backend for 24 hours
     2. **Batch Loading**: Load tags for multiple documents in one request when displaying lists
     3. **Lazy Loading**: Only load full tag details when needed (document detail view)
     4. **Optimistic Updates**: Update UI immediately when adding/removing user tags

     ## Accessibility

     1. **Screen Readers**:
        - Announce tag type (AI/User)
        - Read confidence levels
        - Provide context for tag categories

     2. **Keyboard Navigation**:
        - Tags should be focusable
        - Enter/Space to select in filters
        - Delete key to remove user tags

     3. **Color Contrast**:
        - Ensure tag colors meet WCAG AA standards
        - Don't rely solely on color to convey information

     ## Mobile Considerations

     1. **Responsive Tag Display**:
        - Show fewer tags on mobile (2-3 max)
        - Expandable tag section for full list
        - Touch-friendly tag sizes (min 44x44px tap target)

     2. **Tag Selection**:
        - Larger touch targets for filters
        - Slide-out filter panel on mobile
        - Clear selected state indicators

     ## Testing Checklist

     - [ ] Tags load correctly with documents
     - [ ] AI tags show confidence indicators
     - [ ] User can add custom tags
     - [ ] User can remove their tags (not AI tags)
     - [ ] Tag filtering works (any/all modes)
     - [ ] Tags display correctly in thumbnails
     - [ ] Mobile responsive behavior
     - [ ] Accessibility requirements met
     - [ ] Performance with many tags
     - [ ] Error handling for tag operations

     ## Error States

     1. **Tags Failed to Load**: Show document without tags, retry button
     2. **Add Tag Failed**: Show error toast, keep tag in input
     3. **Remove Tag Failed**: Revert UI change, show error
     4. **Invalid Tag Name**: Validate before sending (alphanumeric + hyphens)

     ## Future Enhancements

     1. **Tag Suggestions**: Suggest tags based on document content
     2. **Tag Analytics**: Show most used tags, tag trends
     3. **Bulk Tag Operations**: Add/remove tags from multiple documents
     4. **Tag Hierarchies**: Parent-child tag relationships
     5. **Tag Aliases**: Map similar tags together
     6. **Tag Permissions**: Control who can add/modify tags

21:31

● I've created a comprehensive frontend context document for the AI tagging feature. This document includes:

  1. API Endpoints - All endpoints for tag operations
  2. Data Structures - TypeScript interfaces for type safety
  3. UI/UX Guidelines - Visual design recommendations
  4. Implementation Examples - React component examples
  5. State Management - Store structure suggestions
  6. Performance Considerations - Optimization tips
  7. Accessibility - WCAG compliance guidelines
  8. Mobile Considerations - Responsive design notes
  9. Testing Checklist - What to test
  10. Error Handling - How to handle failures

  The document provides everything a frontend developer needs to implement the AI tagging feature, including code examples, color schemes, and best practices for displaying tags with confidence scores.
